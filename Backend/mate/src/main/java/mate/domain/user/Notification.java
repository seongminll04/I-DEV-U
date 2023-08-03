package mate.domain.user;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class Notification {

    @Id @GeneratedValue
    private int idx;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_idx")
//    private User user;
    private int userIdx;

    private String content;
    private LocalDateTime creatAt;
    @Enumerated(EnumType.STRING)
    private NotificationType dataType;

    private String checked;


}
