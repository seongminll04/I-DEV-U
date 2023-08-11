package mate.global.login.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mate.domain.user.User;
import mate.global.jwt.service.JwtService;
import mate.repository.user.UserRepository;
import mate.session.domain.Session;
import mate.session.domain.SessionRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final UserRepository userRepository;
//    private final RedisService redisService;
    private final SessionRepository sessionRepository;

    @Value("${jwt.access.expiration}")
    private String accessTokenExpiration;
    @Value("${jwt_refresh_expiration}")
    private String refreshAccessTokenExpiration;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        String email = extractUsername(authentication); // 인증 정보에서 Username(email) 추출
        String accessToken = jwtService.createAccessToken(email); // JwtService의 createAccessToken을 사용하여 AccessToken 발급
        String refreshToken = jwtService.createRefreshToken(); // JwtService의 createRefreshToken을 사용하여 RefreshToken 발급

        jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken); // 응답 헤더에 AccessToken, RefreshToken 실어서 응답

        Optional<User> loginUser = userRepository.findByEmail(email);
        loginUser.ifPresent(user -> {
                    user.updateRefreshToken(refreshToken);
                    userRepository.saveAndFlush(user);

                    List<Integer> list = new ArrayList<>();
                    list.add(user.getIdx());

                    List<Session> sessions = sessionRepository.findByUser(list);
                    if (sessions.isEmpty()){
                        Session session = Session.createSession(user.getIdx(), user.getNickname());
                        sessionRepository.save(session);
                    }
                });
//        redisService.setRedis(refreshToken, email);
        String responseBody = "{\"message\": \"로그인에 성공하였습니다.\", \"userIdx\": \"" + loginUser.get().getIdx() + "\" , \"userNickname\": \"" + loginUser.get().getNickname() + "\"}";
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(responseBody);

        log.info("로그인에 성공하였습니다. 이메일 : {}", email);
        log.info("로그인에 성공하였습니다. AccessToken : {}", accessToken);
        log.info("로그인에 성공하였습니다. RefreshToken : {}", refreshToken);
        log.info("발급된 AccessToken 만료 기간 : {}", accessTokenExpiration);
        log.info("발급된 RefreshToken 만료 기간 : {}", refreshAccessTokenExpiration);

    }

    private String extractUsername(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userDetails.getUsername();
    }
}
