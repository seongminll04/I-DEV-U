import React, { Component } from 'react';
import { OpenVidu } from 'openvidu-browser';
import UserVideoComponent from './UserVideoComponent';
import cam_set_css from './cam.module.css'

import Button from '@mui/material/Button';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/Videocam';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/Mic';
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
}

class Cam extends Component<{}, AppState> {
    private OV: any;

    constructor(props: {}) {
        super(props);
        this.state = { 
            subscribers: [],
            publishVideo: true,
            publishAudio: true,
            audioVolume: 100,
            hideAll: false
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
            // 볼륨을 최대로 설정
        } else {
            this.setState({ audioVolume: 0 });
            // 볼륨을 끔
        }
        // 스피커 볼륨 설정
        this.state.subscribers.forEach(subscriber => subscriber.setAudioVolume(this.state.audioVolume));
    }

    toggleVisibility() {
        this.setState(prevState => ({ hideAll: !prevState.hideAll }));
    }

    async joinSession() {
        this.OV = new OpenVidu();
        const session = this.OV.initSession();
    
        session.on('streamCreated', (event: any) => {
            const subscriber = session.subscribe(event.stream, undefined);
            const subscribers = [...this.state.subscribers, subscriber];
            this.setState({ subscribers });
        });
    
        session.on('streamDestroyed', (event: any) => {
            this.setState(prevState => ({
                subscribers: prevState.subscribers.filter(sub => sub !== event.stream.streamManager)
            }));
        });
    
        try {
            // 세션 ID를 로컬 스토리지에서 가져옴
            const sessionId = localStorage.getItem('OVSession');
            console.log("11111111111111111111")
            if (!sessionId) {
                console.error("Session ID is missing");
                return;
            }
    
            // 해당 세션 ID에 대한 토큰을 서버에서 가져옴
            const response = await fetch(`https://i9b206.p.ssafy.io:5000/api/sessions/${sessionId}/connections`, { method: 'POST' });
            const data = await response.json();
            const token = data.token;

            console.log("22222222222222222222222")
            console.log(response+"@@@@@@@@@@@@@@@@@@@@")
            console.log(data+"@@@@@@@@@@@@@@@@@@@@")
            console.log(token+"@@@@@@@@@@@@@@@@@@@@")
    
            if (!token) {
                console.error("Failed to fetch token from the server");
                return;
            }
    
            session.connect(token)
                .then(() => {
                    const publisher = this.OV.initPublisher(undefined, {
                        audio: this.state.publishAudio,
                        video: this.state.publishVideo
                    });
    
                    session.publish(publisher).then(() => {
                        this.setState({ publisher });
                    });
                })
                .catch((error: any) => {
                    console.error("Error during session connection:", error);
                });
        } catch (error) {
            console.error("Error fetching token:", error);
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
                                <div key={sub.id} className={`${cam_set_css["stream-container"]} ${cam_set_css["col-md-6"]} ${cam_set_css["col-xs-6"]}`}>
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

export default Cam;