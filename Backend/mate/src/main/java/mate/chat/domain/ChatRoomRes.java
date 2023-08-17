package mate.chat.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mate.alarm.dto.ChatParticipationResponse;
import mate.alarm.dto.ChatRoomResponse;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoomRes {

    private Integer idx;
    private String title;
    private ChatRoomStatus type;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private int userCount;
    private List<ChatParticipation> userList;

    public static ChatRoomRes from(ChatRoom chatRoom, List<ChatParticipation> userList){

        ChatRoomRes chatRoomRes = new ChatRoomRes();
        chatRoomRes.idx = chatRoom.getIdx();
        chatRoomRes.title = chatRoom.getTitle();
        chatRoomRes.type = chatRoom.getType();
        chatRoomRes.createdAt = chatRoom.getCreatedAt();
        chatRoomRes.updatedAt = chatRoom.getUpdatedAt();
        chatRoomRes.userCount = chatRoom.getUserCount();
        chatRoomRes.userList = userList;
        return chatRoomRes;
    }

}
