package mate.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user")
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idx;

    private String email;
    private String password;
    private String name;
    private String nickname;
    private Date birth;
    private int gender;
    private String intro;
    private String status;
    private int grade;

    // 생성자, 기타 메서드 생략

    @Builder
    public User(String email, String password, String auth) {
        this.email = email;
        this.password = password;
    }
}