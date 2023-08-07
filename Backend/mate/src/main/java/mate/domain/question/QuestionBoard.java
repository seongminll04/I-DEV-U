package mate.domain.question;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import mate.domain.user.User;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@RequiredArgsConstructor
public class QuestionBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idx;

    @ManyToOne
    @JoinColumn(name = "user_idx")
    private User user;
//    private int userIdx;

    private String title;

    private String content;

    private LocalDateTime createAt;
}
