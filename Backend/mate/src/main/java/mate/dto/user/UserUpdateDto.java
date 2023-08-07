package mate.dto.user;

import lombok.Data;
import mate.domain.user.UserGender;

import java.time.LocalDate;

@Data
public class UserUpdateDto {
    private Integer userIdx;
    private String email;
    private String name;
    private String nickname;
    private LocalDate birth;
    private UserGender gender;
    private String intro;
    private String image;
    private String password;
    private String originalFileName;
    private String storedFileName;
}
