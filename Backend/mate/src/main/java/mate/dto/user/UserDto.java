package mate.dto.user;

import java.time.LocalDate;
import java.util.List;

import lombok.Data;
import mate.domain.user.UserGender;

/*
    {
        "resmsg": "회원조회 성공",
        "user": {
            "useIdx (INT)": 조회한 유저의 고유번호,
            "email (VARCHAR)": "조회한 유저의 이메일",
            "name (VARCHAR)": "조회한 유저의 이름",
            "nickname (VARCHAR)": "조회한 유저의 닉네임",
            "birth (DATE)": 조회한 유저의 생년월일,
            "gender (INT)": 조회한 유저의 성별,
            "intro (TEXT)": "조회한 유저의 한줄 소개"
            "image (FILE:jpg,png)": "유저 프로필 사진",
        }
    }
 */
@Data
public class UserDto {
	private Integer userIdx;
	private String email;
	private String name;
	private String nickname;
	private LocalDate birth;
	private UserGender gender;
	private String intro;
	private String invite;
	private String originalFileName;
	private String storedFileName;

	// 동료 상세보기 시도 시, 조회되는 데이터
	private List<String> techList;
}
