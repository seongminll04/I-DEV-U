package mate.dto.user;

import lombok.Data;
import org.springframework.security.crypto.password.PasswordEncoder;

@Data
public class UserLoginDto {

    private String email;
    private String password;

    public void passwordEncode(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }
}
