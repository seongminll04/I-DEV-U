package mate.domain.chat;

import lombok.Getter;
import mate.domain.user.User;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class ChatMessage {
    @Id @GeneratedValue
    private int idx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_idx")
    private ChatParticipation user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_idx")
    private ChatParticipation room;

    private String message;

    private LocalDateTime createdAt;








}
