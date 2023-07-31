package mate.domain.video;

import lombok.Getter;
import mate.domain.user.User;

import javax.persistence.*;

@Entity
@Getter
public class VideoParticipation {

    @Id @GeneratedValue
    private int idx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_idx")
    private VideoRoom videoRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_idx")
    private User user;
}
