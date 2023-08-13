import React, { Component } from 'react';
import { OpenVidu } from 'openvidu-browser';
import UserVideoComponent from './UserVideoComponent';
import cam_set_css from './cam.module.css'
import axios from 'axios';

import Button from '@mui/material/Button';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import SwitchVideoIcon from '@mui/icons-material/SwitchVideo';

interface AppState {
    session?: any;
    publisher?: any;
    subscribers: any[];
    currentVideoDevice?: MediaDeviceInfo;
    publishVideo: boolean;
    publishAudio: boolean;
    audioVolume: number;   // 스피커 볼륨 상태
    hideAll: boolean;      // 화면 숨기기 상태
    eventBindingsSet: boolean;
}

class Cam extends Component<{}, AppState> {
    private OV: any;

    constructor(props: {}) {
        super(props);
        this.state = { 
            subscribers: [],
            publishVideo: false,
            publishAudio: false,
            audioVolume: 100,
            hideAll: false,
            eventBindingsSet: false,
        };

        this.joinSession = this.joinSession.bind(this);
        this.switchCamera = this.switchCamera.bind(this)
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    componentDidMount() {
        this.joinSession();
        window.addEventListener('beforeunload', this.handleBeforeUnload);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleBeforeUnload);

        if (this.state.publisher) {
            this.state.publisher.destroy();
        }
    
        if (this.state.session) {
            this.state.session.disconnect();
        }
    }

    handleBeforeUnload(event: BeforeUnloadEvent) {
        event.preventDefault();
        event.returnValue = '다른 맵으로 가시겠습니까?';
    }

    toggleVideo = () => {
        if (this.state.publisher) {
            this.state.publisher.publishVideo(!this.state.publishVideo);
            this.setState({ publishVideo: !this.state.publishVideo });
        }
    };
    
    toggleAudio = () => {
        if (this.state.publisher) {
            this.state.publisher.publishAudio(!this.state.publishAudio);
            this.setState({ publishAudio: !this.state.publishAudio });
        }
    };

    toggleSpeaker = () => {
        if (this.state.audioVolume === 0) {
            this.setState({ audioVolume: 100 });
        } else {
            this.setState({ audioVolume: 0 });
        }
        this.state.subscribers.forEach(subscriber => {
            const videoElem = document.getElementById(subscriber.stream.streamId) as HTMLVideoElement;
            if (videoElem) {
                videoElem.volume = this.state.audioVolume / 100;
            }
        });
    }

    toggleVisibility() {
        this.setState(prevState => ({ hideAll: !prevState.hideAll }), () => {
            if (this.state.hideAll) {  // If everything is turned off
                if (this.state.publisher) {
                    // 카메라와 마이크 끄기
                    this.state.publisher.publishVideo(false);
                    this.state.publisher.publishAudio(false);
                }
                // 스피커 끄기
                this.setState({ audioVolume: 0 });
                this.state.subscribers.forEach(subscriber => {
                    const videoElem = document.getElementById(subscriber.stream.streamId) as HTMLVideoElement;
                    if (videoElem) {
                        videoElem.volume = 0;
                    }
                });
            } else {
                // Optionally, if you want to turn everything back on when toggling back to "ON"
                if (this.state.publisher) {
                    this.state.publisher.publishVideo(true);
                    this.state.publisher.publishAudio(true);
                }
                this.setState({ audioVolume: 100 });
                this.state.subscribers.forEach(subscriber => {
                    const videoElem = document.getElementById(subscriber.stream.streamId) as HTMLVideoElement;
                    if (videoElem) {
                        videoElem.volume = 1;
                    }
                });
            }
        });
    }

    async joinSession() {
        // 1. 세션 초기화
        this.OV = new OpenVidu();
        const session = this.OV.initSession();
    
        // 2. 이벤트 리스너 설정
        if (!this.state.eventBindingsSet) {
            session.on('streamCreated', (event: any) => {
                if (this.state.publisher && event.stream.streamId === this.state.publisher.stream.streamId) {
                    return;
                }
                if (event.stream.connection.connectionId === session.connection.connectionId) {
                    return;
                }
                if (!this.state.subscribers.some(sub => sub.stream.streamId === event.stream.streamId)) {
                    const subscriber = session.subscribe(event.stream, undefined);
                    const subscribers = [...this.state.subscribers, subscriber];
                    this.setState({ subscribers });
                }
            });
    
            session.on('streamDestroyed', (event: any) => {
                this.setState(prevState => ({
                    subscribers: prevState.subscribers.filter(subscriber => subscriber.stream.streamId !== event.stream.streamId)
                }));
            });
    
            this.setState({ eventBindingsSet: true });
        }
    
        // 3. 세션을 위한 토큰 얻기
        try {
            const sessionId = localStorage.getItem('OVsession');
            if (!sessionId) {
                console.error("세션 ID가 없습니다.");
                return;
            }
    
            const response = await axios.post(`https://i9b206.p.ssafy.io:5000/api/sessions/${sessionId}/connections`);
            const token = response.data;
            localStorage.setItem("OVtoken", token);
    
            if (!token) {
                console.error("서버에서 토큰을 가져오는데 실패했습니다.");
                return;
            }
    
            // 4. 세션에 연결
            const userNickname = localStorage.getItem('userNickname');
            session.connect(token, userNickname).then(() => {
                // 5. 세션에 게시
                const publisher = this.OV.initPublisher(undefined, {
                    audio: false,
                    video: false
                });
    
                publisher.on('accessAllowed', () => {
                    publisher.publishVideo(false);
                    publisher.publishAudio(false);
                    session.publish(publisher).then(() => {
                        this.setState({ publisher });
                    });
                });
    
                // 주기적으로 스트림 목록 업데이트
                const updateStreams = () => {
                    const existingSubscribers: any[] = [...this.state.subscribers];
                    session.getStreams().forEach((stream: any) => {
                        if (!this.state.subscribers.some(sub => sub.stream.streamId === stream.streamId)) {
                            const subscriber = this.OV.subscribe(stream, undefined);
                            existingSubscribers.push(subscriber);
                        }
                    });
                    this.setState({ subscribers: existingSubscribers });
                };
    
                updateStreams();
                const updateInterval = setInterval(updateStreams, 5000);
                window.addEventListener('beforeunload', () => {
                    clearInterval(updateInterval);
                });
            }).catch((error: any) => {
                console.error("세션 연결 중 오류:", error);
            });
        } catch (error) {
            console.error("토큰 가져오기 오류:", error);
        }
        this.setState({ session });
    }
    
    
    
    

    async switchCamera() {
        if (this.state.publisher) {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoInputDevices = devices.filter(device => device.kind === "videoinput");
            
            if (this.state.currentVideoDevice) {
                let index = videoInputDevices.findIndex(device => device.deviceId === this.state.currentVideoDevice?.deviceId);
                index = index < videoInputDevices.length - 1 ? index + 1 : 0;
                this.state.publisher.switchCamera(videoInputDevices[index].deviceId);
                this.setState({ currentVideoDevice: videoInputDevices[index] });
            } else if (videoInputDevices[1]) {
                this.state.publisher.switchCamera(videoInputDevices[1].deviceId);
                this.setState({ currentVideoDevice: videoInputDevices[1] });
            }
        }
    }

    render() {
        const { session, publisher, subscribers } = this.state;
    
        if (this.state.hideAll) {
            return (
                <div>
                    <Button 
                    className={cam_set_css.toggleVisibility} 
                    onClick={this.toggleVisibility}
                    style={{ fontSize: '1.5em',fontWeight: 'bold', color: 'red', transform: 'translateX(1030%) translateY(1250%)'}} >
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
                                style={{ fontSize: '1.5em',fontWeight: 'bold', color: 'black' }} >
                                off
                            </Button>
                            <Button 
                            className={cam_set_css.toggleVideo} 
                            onClick={this.toggleVideo}
                            startIcon={this.state.publishVideo ? 
                                <VideocamIcon style={{ fontSize: '3em', color: 'black' }} /> :
                                <VideocamOffIcon style={{ fontSize: '3em', color: 'black' }} />} >
                            </Button>
                            <Button 
                                className={cam_set_css.toggleAudio} 
                                onClick={this.toggleAudio}
                                startIcon={this.state.publishAudio ? 
                                    <MicIcon style={{ fontSize: '3em', color: 'black' }} /> : 
                                    <MicOffIcon style={{ fontSize: '3em', color: 'black' }} />} >
                            </Button>
                            <Button 
                                className={cam_set_css.toggleSpeaker} 
                                onClick={this.toggleSpeaker}
                                startIcon={this.state.audioVolume === 0 ? 
                                    <VolumeUpIcon style={{ fontSize: '3em', color: 'black' }} /> : 
                                    <VolumeOffIcon style={{ fontSize: '3em', color: 'black' }} />}>
                            </Button>
                            <Button 
                                className={cam_set_css.switchCamera} 
                                onClick={this.switchCamera}
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

export default React.memo(Cam);
