package mate.domain.question;

import lombok.*;
import mate.domain.user.User;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class QuestionBoardComment {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idx;

    @ManyToOne()
//    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_idx")
    private QuestionBoard questionBoard;

    @ManyToOne()
//    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_idx")
    private User user;

    private String content;

    @CreatedDate
    private LocalDateTime createAt;

    private LocalDateTime createdAt;

}
