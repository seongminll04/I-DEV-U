package mate.service;

import lombok.RequiredArgsConstructor;
import mate.config.jwt.TokenProvider;
import mate.domain.User;
import org.springframework.stereotype.Service;

import java.time.Duration;

@RequiredArgsConstructor
@Service
public class TokenService {
    private final TokenProvider tokenProvider;
    private final RefreshTokenService refreshTokenService;
    private final UserService userService;

    public String createNewAccessToken(String refreshToken) {
        // 토큰 유효성 검사에 실패하면 예외 발생
        if (!tokenProvider.validToken(refreshToken)) {
            throw new IllegalArgumentException("Unexpected token");
        }

        // 전달받은 리프레시 토큰으로 토큰 유효성 검사를 진행한다.
        // 유효한 토큰인 때 리프레시 토큰으로 유저 id를 찾는다.
        Integer userIdx = refreshTokenService.findByRefreshToken(refreshToken).getUserIdx();
        User user = userService.findById(userIdx);

        // 유저 id를 찾은 후에 토큰 제공자의 generateToken() 메서드를 호출해서 새로운 액세스 토큰을 생성한다.
        return tokenProvider.generateToken(user, Duration.ofHours(2));
    }
}
