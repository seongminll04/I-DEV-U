package mate.dto.user;

import lombok.Data;
import mate.domain.user.UserGender;

import java.time.LocalDate;

@Data
public class UserSignUpDto {

    private String email;
    private String password;
    private String name;
    private String nickname;
    private LocalDate birthday;
    private UserGender gender;
    private String image;


}
