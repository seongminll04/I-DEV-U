package mate.domain.video;

import lombok.Getter;
import mate.domain.user.User;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class VideoRoom {

    @Id @GeneratedValue
    private int idx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_idx")
    private User user;

    private String title;
    private String content;
    private int totalNumber;
    @Enumerated(EnumType.STRING)
    private VideoType type;

    private LocalDateTime createdAt;
    private String url;



}
