import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';

interface Props {
    streamManager: any; // OpenVidu의 StreamManager의 타입??
}

export default class UserVideoComponent extends Component<Props> {

    getNicknameTag(): string {
        // Gets the nickName of the user
        return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
    }

    render(): JSX.Element {
        return (
            <div>
                {this.props.streamManager !== undefined ? (
                    <div className="streamcomponent">
                        <OpenViduVideoComponent streamManager={this.props.streamManager} />
                        <div><p>{this.getNicknameTag()}</p></div>
                    </div>
                ) : null}
            </div>
        );
    }
}
