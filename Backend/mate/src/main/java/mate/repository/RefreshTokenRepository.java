package mate.repository;

import mate.domain.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Integer> {
    Optional<RefreshToken> findByUserIdx(Integer userIdx);
    Optional<RefreshToken> findByRefreshToken(String refreshToken);
}
