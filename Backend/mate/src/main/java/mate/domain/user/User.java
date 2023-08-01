package mate.domain.user;

import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idx;
    private String email;
    private String password;
    private String name;
    private String nickname;
    private LocalDate birth;
    @Enumerated(EnumType.STRING)
    private UserGender gender; // 0 : 남자, 1 : 여자
    private String intro;
    @Enumerated(EnumType.STRING)
    private UserStatus status; //
    @Enumerated(EnumType.STRING)
    private Role role; // ADMIN , USER
    private String refreshToken;


    // 생성자, 기타 메서드 생략

    // 비밀번호 암호화 메소드
    public void passwordEncode(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }


    public void updateRefreshToken(String updateRefreshToken) {
        this.refreshToken = updateRefreshToken;
    }
}