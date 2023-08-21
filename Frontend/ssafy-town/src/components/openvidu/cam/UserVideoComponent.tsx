import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';

interface Props {
    streamManager: any; // 추후에 OpenVidu의 StreamManager의 타입으로 변경
}

export default class UserVideoComponent extends Component<Props> {

    getNicknameTag(): string {
        const connectionData = this.props.streamManager?.stream?.connection?.data;
        let nickname = "알수없음";
    
        try {
            const parsedData = JSON.parse(connectionData);
            nickname = parsedData.clientData || nickname;
        } catch (e) {
            console.error("Failed to parse connection data:", e);
        }
    
        return nickname;
    }

    render(): JSX.Element {
        return (
            <div>
                {this.props.streamManager ? (
                    <div className="streamcomponent">
                        <OpenViduVideoComponent streamManager={this.props.streamManager} />
                        <div><p>{this.getNicknameTag()}</p></div>
                    </div>
                ) : null}
            </div>
        );
    }
}
