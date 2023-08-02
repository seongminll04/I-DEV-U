package mate.global.jwt.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class RedisService {

    private final RedisTemplate redisTemplate;

    @Value("${jwt.refresh.expiration}")
    private Long refreshTokenExpirationPeriod;

    public String getData(String key) {
        return (String) redisTemplate.opsForValue().get(key);
    }

    public void setDataWithExpiration(String key, String value, Long time) {
        if (this.getData(key) != null)
            this.deleteData(key);
        redisTemplate.opsForValue().set(key, value, refreshTokenExpirationPeriod);
    }

    public void deleteData(String key) {
        redisTemplate.delete(key);
    }

}