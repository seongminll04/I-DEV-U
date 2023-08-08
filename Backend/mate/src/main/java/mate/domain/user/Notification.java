package mate.domain.user;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class Notification {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idx;

    @ManyToOne
    @JoinColumn(name = "user_idx")
    private User user;

    private String content;

    @CreatedDate
    private LocalDateTime createasdAt;

    @Enumerated(EnumType.STRING)
    private NotificationType dataType;

    private String checked;


}
