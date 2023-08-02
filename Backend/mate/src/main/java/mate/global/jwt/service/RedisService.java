package mate.global.jwt.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.TimeToLive;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;

@Service
@Transactional
@RequiredArgsConstructor
public class RedisService {

    private final RedisTemplate redisTemplate;

    @Value("${jwt.refresh.expiration}")
    @TimeToLive
    private Long refreshTokenExpirationPeriod;

    public String getRedis(String key) {
        return (String) redisTemplate.opsForValue().get(key);
    }


    public void setRedis(String email, String token) {
        if (this.getRedis(email) != null)
            this.deleteRedis(email);
        redisTemplate.opsForValue().set(email, token, refreshTokenExpirationPeriod);
    }

    public void deleteRedis(String key) {
        redisTemplate.delete(key);
    }

}