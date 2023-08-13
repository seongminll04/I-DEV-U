import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';

interface Props {
    streamManager: any; // 추후에 OpenVidu의 StreamManager의 타입으로 변경
}

export default class UserVideoComponent extends Component<Props> {

    getNicknameTag(): string {
        const connectionData = this.props.streamManager?.stream?.connection?.data;
        if (!connectionData || connectionData === "undefined") {
            return "알수없음"; // 또는 적절한 디폴트 값
        }
        const parsedData = JSON.parse(connectionData);
        console.log(connectionData,"1번");
        console.log(parsedData.clientData,"2번");
        return parsedData.clientData || "알수없음";
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
