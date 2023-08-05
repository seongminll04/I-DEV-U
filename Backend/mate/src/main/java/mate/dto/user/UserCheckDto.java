package mate.dto.user;

import lombok.Data;
import org.springframework.security.crypto.password.PasswordEncoder;

@Data
public class UserCheckDto {

    private Integer userIdx;
    private String password;

    public void passwordEncode(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }
}
