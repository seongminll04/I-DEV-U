package mate.domain.user;

import javax.persistence.*;
import java.util.Date;
import lombok.Data;
import lombok.Getter;

@Entity
@Getter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idx;
    private String email;
    private String password;
    private String name;
    private String nickname;
    private Date birth;
    private int gender; // 0 : 남자, 1 : 여자
    private String intro;
    @Enumerated(EnumType.STRING)
    private UserStatus status; //
    @Enumerated(EnumType.STRING)
    private UserGrade grade; // ADMIN , USER


    // 생성자, 기타 메서드 생략
}