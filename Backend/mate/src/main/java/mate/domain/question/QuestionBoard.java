package mate.domain.question;

import lombok.Getter;
import mate.domain.user.User;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class QuestionBoard {

    @Id @GeneratedValue
    private int idx;

    @ManyToOne
    @JoinColumn(name = "user_idx")
    private User user;

    private String title;
    private String content;
    private LocalDateTime createAt;
}
