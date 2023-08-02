package mate.global.jwt.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.TimeToLive;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class RedisService {

    private final RedisTemplate redisTemplate;

    @Value("${jwt.refresh.expiration}")
    @TimeToLive
    private Long refreshTokenExpirationPeriod;

    public Optional<String> getRedis(String key) {
        return (Optional<String>) redisTemplate.opsForValue().get(key);
    }


    public void setRedis(String token, String email) {
        if (this.getRedis(token) != null)
            this.deleteRedis(token);
        redisTemplate.opsForValue().set(token, email, refreshTokenExpirationPeriod);
    }

    public void deleteRedis(String key) {
        redisTemplate.delete(key);
    }

}