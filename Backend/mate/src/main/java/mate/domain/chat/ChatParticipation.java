package mate.domain.chat;

import lombok.Getter;
import mate.domain.user.User;

import javax.persistence.*;

@Entity
@Getter
public class ChatParticipation {

    @Id @GeneratedValue
    private int idx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_idx")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_idx")
    private ChatRoom chatRoom;
}
