package mate.global.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mate.domain.user.User;
import mate.global.exception.NotFoundException;
import mate.global.jwt.service.JwtService;
import mate.repository.user.UserRepository;
import mate.session.domain.Session;
import mate.session.domain.SessionRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
public class StompHandler implements ChannelInterceptor {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final SessionRepository sessionRepository;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        if (StompCommand.CONNECT == accessor.getCommand()) {
            if (!jwtService.isTokenValid(extractToken(accessor))) {
                System.out.println(extractToken(accessor));
                throw new AccessDeniedException("연결 거부");
            }
        }
        String token = extractToken(accessor);
        String email = jwtService.extractEmail(token)
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));

        Optional<User> loginUser = userRepository.findByEmail(email);
        loginUser.ifPresent(user -> {
            List<Integer> list = new ArrayList<>();
            list.add(user.getIdx());
            sessionRepository.findByUserIdx(list)
                    .ifPresentOrElse(
                            session -> log.info("세션 존재"),
                            () -> {
                                Session session = Session.createSession(user.getIdx(), user.getNickname());
                                sessionRepository.save(session);
                            }
                    );
        });
        return message;
    }

    private String extractToken(StompHeaderAccessor accessor) {
        String bearerToken = accessor.getFirstNativeHeader(HttpHeaders.AUTHORIZATION);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

}
