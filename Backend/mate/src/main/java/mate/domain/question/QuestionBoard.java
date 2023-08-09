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
public class QuestionBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idx;

    @ManyToOne
    @JoinColumn(name = "user_idx")
    private User user;

    private String title;

    private String content;

    @CreatedDate
    private LocalDateTime createAt;

    @Override
    public String toString() {
        return "QuestionBoard{" +
                ", user=" + user +
                '}';
    }
}
