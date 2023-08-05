package mate.domain.video;

import lombok.*;
import mate.domain.user.User;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
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
