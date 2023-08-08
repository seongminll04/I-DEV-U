package mate.chat.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import mate.domain.user.User;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class ChatParticipation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idx;

    @Enumerated(EnumType.STRING)
    private Role role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_idx")
    public User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_idx")
    public ChatRoom chatRoom;

    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;

    public static ChatParticipation createChatRoomUser(Role role, User user, ChatRoom chatRoom) {
        ChatParticipation chatRoomUser = new ChatParticipation();
        chatRoomUser.role = role;
        chatRoomUser.user = user;
        chatRoomUser.chatRoom = chatRoom;
        return chatRoomUser;
    }

}
