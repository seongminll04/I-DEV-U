package mate.domain.chat;

import lombok.Getter;
import mate.domain.user.User;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class ChatParticipation {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_idx")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_idx")
    private ChatRoom chatRoom;

    @Enumerated(EnumType.STRING)
    ChatRole role;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
