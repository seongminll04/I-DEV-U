package mate.global.config;

import lombok.RequiredArgsConstructor;
import mate.global.handler.StompHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * WebSocketMessageBrokerConfigurer를 구현한 클래스입니다.
 * 메소드를 오버라이드 하여 메시지 브로커에 대한 다양한 설정을 할 수 있습니다.
 */
@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    /**
     * addEndpoint()
     * -> 웹소켓 엔드포인트를 지정합니다. 추후 클라이언트에서
     * 해당 경로로 서버와 handshake 하게 됩니다.
     * setAllowedOriginPatterns()
     * -> 허용할 origin 패턴을 지정합니다. (CORS 설정)
     * withSockJS()
     * -> SockJS를 사용하여 브라우저에서 websocket을 지원하지 않을 경우 대체 옵션을 지원 합니다.
     * @param registry
     */

    private final StompHandler stompHandler;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-stomp")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }


    /**
     * enableSimpleBroker
     * -> 메시지 브로커를 활성화하고 subscribe 메시지 접두사를 설정합니다.
     * setApplicationDestinationPrefixes
     * -> 클라이언트에서 발송한 메시지중 Destination이 해당 경로(/app)로 시작하는 메시지를 메시지 브로커에서 처리하게합니다.
     * @param registry
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/sub");
        registry.setApplicationDestinationPrefixes("/pub");
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(stompHandler);
    }
}
