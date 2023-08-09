package mate.chat.domain;


import lombok.*;
import mate.domain.user.User;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idx;

    private String title;

    @Enumerated(EnumType.STRING)
    private ChatRoomStatus type;

    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;

    private int userCount;

    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChatParticipation> chatRoomUsers = new ArrayList<>();

    public static ChatRoom createChatRoom(String title, User user) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.title = title;
        chatRoom.type = ChatRoomStatus.LACK;
        chatRoom.createdAt = LocalDateTime.now();
        chatRoom.updatedAt = LocalDateTime.now();
        chatRoom.chatRoomUsers.add(ChatParticipation.createChatRoomUser(Role.MASTER, user, chatRoom));
        chatRoom.userCount++;
        return chatRoom;
    }

}
