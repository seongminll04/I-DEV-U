package mate.global.jwt.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;

@Service
@Transactional
@RequiredArgsConstructor
public class RedisService {

    private final RedisTemplate redisTemplate;

    @Value("${jwt.refresh.expiration}")
    private Long refreshExpirationPeriod;

    public String getData(String key) {
        return (String) redisTemplate.opsForValue().get(key);
    }

    public void setDataWithExpiration(String key, String value) {
        if (this.getData(key) != null)
            this.deleteData(key);
        Duration refreshTokenExpirationPeriod = Duration.ofSeconds(refreshExpirationPeriod);
        redisTemplate.opsForValue().set(key, value, refreshTokenExpirationPeriod);
    }

    public void deleteData(String key) {
        redisTemplate.delete(key);
    }

}