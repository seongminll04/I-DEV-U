import React, { Component, RefObject } from 'react';

interface Props {
    streamManager: {
        addVideoElement: (element: HTMLVideoElement | null) => void;
    };
}

export default class OpenViduVideoComponent extends Component<Props> {
    private videoRef: RefObject<HTMLVideoElement>;

    constructor(props: Props) {
        super(props);
        this.videoRef = React.createRef<HTMLVideoElement>();
    }

    componentDidUpdate(prevProps: Props): void {
        if (this.props.streamManager !== prevProps.streamManager) {
            this.attachVideoElement();
        }
    }

    componentDidMount(): void {
        this.attachVideoElement();
    }

    attachVideoElement(): void {
        if (this.props.streamManager && this.videoRef.current) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
    }

    render(): JSX.Element {
        return <video autoPlay={true} ref={this.videoRef} />;
    }
}
