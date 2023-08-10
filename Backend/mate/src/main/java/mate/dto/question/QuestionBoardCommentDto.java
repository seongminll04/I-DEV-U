package mate.dto.question;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class QuestionBoardCommentDto {
    private Integer idx;
    private Integer boardIdx;
    private Integer userIdx;
    private String userNickname;
    private String content;
    private LocalDateTime createdAt;
}
