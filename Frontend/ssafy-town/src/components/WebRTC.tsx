import React, { useEffect, useRef } from 'react';

const WebRTC: React.FC = () => {
    const localConnection = useRef<RTCPeerConnection | null>(null);
    const sendChannel = useRef<RTCDataChannel | null>(null);
    const remoteConnection = useRef<RTCPeerConnection | null>(null);

    useEffect(() => {
        // RTCPeerConnection 생성
        localConnection.current = new RTCPeerConnection();
        sendChannel.current = localConnection.current.createDataChannel('sendDataChannel');
        remoteConnection.current = new RTCPeerConnection();

        // 데이터 채널의 상태 변화 확인
        sendChannel.current.onopen = (event: Event) => {
            // + 연결됨 표p
        };
        sendChannel.current.onclose = (event: Event) => {
            // + 연결해제 표시
        };

        remoteConnection.current.ondatachannel = (event: RTCDataChannelEvent) => {
            const receiveChannel = event.channel;
            receiveChannel.onmessage = (event: MessageEvent) => {
                handleReceivedData(event.data);
            };
        };

        // 사용자의 오디오, 비디오
                navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then(stream => {
                    if (localConnection.current) {
                        stream.getTracks().forEach(track => {
                            localConnection.current?.addTrack(track, stream);
                        });
                        
                        const localVideo = document.getElementById('localVideo') as HTMLVideoElement;
                        localVideo.srcObject = stream;
                    }
                })
                .catch(error => {
                    console.error("Error accessing media devices.", error);
                });

            // 수신 이벤트 핸들러
            if (remoteConnection.current) {
                remoteConnection.current.ontrack = (event: RTCTrackEvent) => {
                    const remoteVideo = document.getElementById('remoteVideo') as HTMLVideoElement;
                    // 해당 트랙을 원격 비디오 엘리먼트에 연결
                    if (event.streams && event.streams[0]) {
                        remoteVideo.srcObject = event.streams[0];
                    }
                };
            }
    }, []);

    // 움직임 및 기타 데이터를 처리
    const handleReceivedData = (data: string) => {
        const parsedData = JSON.parse(data);
        if (parsedData.type === 'notification') {
            console.log(`Received notification: ${parsedData.message}`);
        } else {
            // 여기서 데이터를 파싱
        }
    };

    const CharacterMove = (direction: string) => {
        if (sendChannel.current) {
            sendChannel.current.send(direction);
        }
    };

    const sendNotification = (message: string) => {
        const notificationData = {
            type: 'notification',
            message: message
        };
        if (sendChannel.current) {
            sendChannel.current.send(JSON.stringify(notificationData));
        }
    };

    return (
        <div>
            <video id="localVideo" autoPlay muted></video>
            <video id="remoteVideo" autoPlay></video>
            {/* 여기에 게임 컨트롤 버튼, 알림 전송 버튼 등의 UI 구성요소를 추가 */}
            <button onClick={() => CharacterMove('left')}>Move Left</button>
            <button onClick={() => CharacterMove('right')}>Move Right</button>
            <button onClick={() => sendNotification('Hello!')}>Send Notification</button>
        </div>
    );
};

export default WebRTC;
