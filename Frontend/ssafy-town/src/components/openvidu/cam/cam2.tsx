import React, { Component } from 'react';
import { OpenVidu } from 'openvidu-browser';
import UserVideoComponent from './UserVideoComponent';
import cam_set_css from './cam.module.css';
import axios from 'axios';

import Button from '@mui/material/Button';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import SwitchVideoIcon from '@mui/icons-material/SwitchVideo';

// const APPLICATION_SERVER_URL = process.env.REACT_APP_FRONT_SERVER; // .env에서 서버 주소 가져오기
const APPLICATION_SERVER_URL = "http://localhost:5000";

interface IState {
    mySessionId: string;
    myUserName: string;
    session: any;
    mainStreamManager: any;
    publisher: any;
    subscribers: any[];

    publishVideo: boolean;
    publishAudio: boolean;
    audioVolume: number;   // 스피커 볼륨 상태
    hideAll: boolean;      // 화면 숨기기 상태
    currentVideoDevice?: MediaDeviceInfo;
}

class Cam2 extends Component<{}, IState> {
    private OV: any; // OpenVidu를 위한 private 변수 선언

    constructor(props: any) {
        super(props);
        
        
        // 초기 상태
        this.state = {
            mySessionId: localStorage.getItem("OVsession") || 'defaultSession',
            myUserName: localStorage.getItem("userNickname") || '알수없음',
            session: undefined,
            mainStreamManager: undefined,
            publisher: undefined,
            subscribers: [],

            publishVideo: false,
            publishAudio: false,
            audioVolume: 100,
            hideAll: false,
        };

        // 여기서 필요하다면 OpenVidu 초기화
        this.OV = new OpenVidu();
    }

    componentDidMount() {
        this.joinSession();
    }

    toggleVideo = () => {
        if (this.state.publisher) {
            this.state.publisher.publishVideo(!this.state.publishVideo);
            this.setState(prevState => ({ publishVideo: !prevState.publishVideo }));
        }
    };
    
    toggleAudio = () => {
        if (this.state.publisher) {
            this.state.publisher.publishAudio(!this.state.publishAudio);
            this.setState(prevState => ({ publishAudio: !prevState.publishAudio }));
        }
    };

    toggleSpeaker = () => {
        this.setState(prevState => ({
            audioVolume: prevState.audioVolume === 0 ? 100 : 0
        }), () => {
            this.state.subscribers.forEach(subscriber => {
                const videoElem = document.getElementById(subscriber.stream.streamId) as HTMLVideoElement;
                if (videoElem) {
                    videoElem.volume = this.state.audioVolume / 100;
                }
            });
        });
    }
    

toggleVisibility = () => {
    this.setState(prevState => ({ hideAll: !prevState.hideAll }), () => {
        if (this.state.hideAll) {
            if (this.state.publisher) {
                this.state.publisher.publishVideo(false);
                this.state.publisher.publishAudio(false);
            }
            this.setState({ audioVolume: 0 });
            this.state.subscribers.forEach(subscriber => {
                const videoElem = document.getElementById(subscriber.stream.streamId) as HTMLVideoElement;
                if (videoElem) {
                    videoElem.volume = 0;
                }
            });
        } else {
            if (this.state.publisher) {
                // On 버튼을 누를 때 카메라와 마이크를 꺼진 상태로 시작
                this.state.publisher.publishVideo(false);
                this.state.publisher.publishAudio(false);
            }
            this.setState({ 
                publishVideo: false, // 카메라를 꺼진 상태로 업데이트
                publishAudio: false, // 마이크를 꺼진 상태로 업데이트
                audioVolume: 100 
            });
            this.state.subscribers.forEach(subscriber => {
                const videoElem = document.getElementById(subscriber.stream.streamId) as HTMLVideoElement;
                if (videoElem) {
                    videoElem.volume = 1;
                }
            });
        }
    });
}

    

    // async switchCamera() {
    //     if (this.state.publisher) {
    //         const devices = await navigator.mediaDevices.enumerateDevices();
    //         const videoInputDevices = devices.filter(device => device.kind === "videoinput");
            
    //         if (this.state.currentVideoDevice) {
    //             let index = videoInputDevices.findIndex(device => device.deviceId === this.state.currentVideoDevice?.deviceId);
    //             index = index < videoInputDevices.length - 1 ? index + 1 : 0;
    //             this.state.publisher.switchCamera(videoInputDevices[index].deviceId);
    //             this.setState({ currentVideoDevice: videoInputDevices[index] });
    //         } else if (videoInputDevices[1]) {
    //             this.state.publisher.switchCamera(videoInputDevices[1].deviceId);
    //             this.setState({ currentVideoDevice: videoInputDevices[1] });
    //         }
    //     }
    // }

    joinSession = () => {
        // OpenVidu가 아직 초기화되지 않았다면 이제 초기화
        if (!this.OV) {
            this.OV = new OpenVidu();
        }
        console.log("@@@@@@@@@@@@@@@@@@@@@@@")
    
        // 세션 초기화
        this.setState({
            session: this.OV.initSession(),
        }, async () => {
            var mySession = this.state.session;
    
            // 새로운 Stream을 받을 때마다...
            mySession.on('streamCreated', (event: any) => {
                // Stream을 받기 위해 구독
                var subscriber = mySession.subscribe(event.stream, undefined);
    
                // 새 스트림을 푸시하기 위한 보조 배열 사용
                var subscribers = this.state.subscribers;
                subscribers.push(subscriber);
    
                // 새 구독자로 상태 업데이트
                this.setState({
                    subscribers: subscribers,
                });
            });
    
            // 스트림이 파괴될 때마다...
            mySession.on('streamDestroyed', (event: any) => {
                event.preventDefault();
                this.deleteSubscriber(event.stream.streamManager);
            });
    
            // 비동기 예외가 발생할 때마다...
            mySession.on('exception', (exception: any) => {
                console.warn(exception);
            });
    
            // 유효한 사용자 토큰과 함께 세션에 연결
            const token = await this.getToken();
    
            mySession.connect(token, { clientData: this.state.myUserName })
                .then(async () => {
    
                    // 자신의 카메라 스트림 가져오기
                    let publisher = await this.OV.initPublisherAsync(undefined, {
                        audioSource: undefined, 
                        videoSource: undefined, 
                        publishAudio: false,
                        publishVideo: false,
                        resolution: '640x480',
                        frameRate: 30,
                        insertMode: 'APPEND',
                        mirror: false,
                    });
    
                    // 스트림 발행
                    mySession.publish(publisher);
    
                    // 사용 중인 현재 비디오 장치 가져오기
                    var devices = await this.OV.getDevices();
                    var videoDevices = devices.filter((device:any) => device.kind === 'videoinput');
                    var currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
                    var currentVideoDevice = videoDevices.find((device:any) => device.deviceId === currentVideoDeviceId);
    
                    // 메인 비디오 페이지 설정 및 발행자 저장
                    this.setState({
                        currentVideoDevice: currentVideoDevice,
                        mainStreamManager: publisher,
                        publisher: publisher,
                    });
                })
                .catch((error:any) => {
                    console.log('세션에 연결하는 중 오류 발생:', error.code, error.message);
                });
        });
    }
    

    deleteSubscriber = (streamManager: any) => {
        const subscribers = this.state.subscribers.filter(sub => sub !== streamManager);
        this.setState({ subscribers });
    }

    getToken = async () => {
        const sessionId = this.state.mySessionId;
        return await this.createToken(sessionId);
    }

    createToken = async (sessionId: string) => {
        const response = await axios.post(APPLICATION_SERVER_URL + '/api/sessions/' + sessionId + '/connections', {}, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data; // 토큰
    }

    render() {
        const { session, publisher, subscribers, hideAll, publishVideo, publishAudio, audioVolume } = this.state;
    
        if (hideAll) {
            return (
                <div>
                    <Button 
                        className={cam_set_css.toggleVisibility} 
                        onClick={this.toggleVisibility}
                        style={{ fontSize: '1.5em', fontWeight: 'bold', color: 'red', transform: 'translateX(1030%) translateY(1250%)'}} >
                        on
                    </Button>
                </div>
            );
        }
    
        return (
            <div className={cam_set_css.container}>
                {session && (
                    <div id={cam_set_css.session}>
                        <div id={cam_set_css["session-header"]}>
                            <Button 
                                className={cam_set_css.toggleVisibility} 
                                onClick={this.toggleVisibility}
                                style={{ fontSize: '1.5em', fontWeight: 'bold', color: 'black' }} >
                                off
                            </Button>
                            <Button 
                                className={cam_set_css.toggleVideo} 
                                onClick={this.toggleVideo}
                                startIcon={publishVideo ? 
                                    <VideocamIcon style={{ fontSize: '3em', color: 'black' }} /> :
                                    <VideocamOffIcon style={{ fontSize: '3em', color: 'black' }} />} >
                            </Button>
                            <Button 
                                className={cam_set_css.toggleAudio} 
                                onClick={this.toggleAudio}
                                startIcon={publishAudio ? 
                                    <MicIcon style={{ fontSize: '3em', color: 'black' }} /> : 
                                    <MicOffIcon style={{ fontSize: '3em', color: 'black' }} />} >
                            </Button>
                            <Button 
                                className={cam_set_css.toggleSpeaker} 
                                onClick={this.toggleSpeaker}
                                startIcon={audioVolume === 0 ? 
                                    <VolumeUpIcon style={{ fontSize: '3em', color: 'black' }} /> : 
                                    <VolumeOffIcon style={{ fontSize: '3em', color: 'black' }} />} >
                            </Button>
                            <Button 
                                className={cam_set_css.switchCamera} 
                                // onClick={this.switchCamera}
                                startIcon={<SwitchVideoIcon style={{ fontSize: '3em', color: 'black' }} />} >
                            </Button>
                        </div>
    
                        <div id={cam_set_css["video-container"]} className={cam_set_css["col-md-6"]}>
                            {publisher && (
                                <div className={`${cam_set_css["stream-container"]} ${cam_set_css["col-md-6"]} ${cam_set_css["col-xs-6"]}`}>
                                    <span>{publisher.id}</span>
                                    <UserVideoComponent streamManager={publisher} />
                                </div>
                            )}
                            {subscribers.map((sub, i) => (
                                <div key={sub.id} className={`${cam_set_css["stream-container2"]} ${cam_set_css["col-md-6"]} ${cam_set_css["col-xs-6"]}`}>
                                    <span>{sub.id}</span>
                                    <UserVideoComponent streamManager={sub} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default React.memo(Cam2);