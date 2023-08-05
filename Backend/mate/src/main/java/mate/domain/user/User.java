package mate.domain.user;

import lombok.*;
import mate.domain.basic.BasicAnswer;
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
    private UserGender gender; // MALE, FEMALE
    private String intro;
    @Enumerated(EnumType.STRING)
    private UserStatus status; // A, B, C, D
    @Enumerated(EnumType.STRING)
    private Role role; // ADMIN , USER
    private String refreshToken;
    private String image;



    // 생성자, 기타 메서드 생략

    // 비밀번호 암호화 메소드
    public void passwordEncode(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }
    public void setKakao(){
        this.password = "kakao";
    }


    public void updateRefreshToken(String updateRefreshToken) {
        this.refreshToken = updateRefreshToken;
    }
}