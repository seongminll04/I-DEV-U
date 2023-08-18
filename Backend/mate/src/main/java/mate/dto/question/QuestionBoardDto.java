package mate.dto.question;

import lombok.Data;
import mate.domain.user.User;

import java.time.LocalDateTime;

@Data
public class QuestionBoardDto {

    private int idx;

    private int userIdx;

    private String userNickname;

    private String title;

    private String content;

    private LocalDateTime createdAt;
}
