package mate.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mate.chat.domain.ChatRoom;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoomListResponse {

    private Integer roomIdx;

    private String title;

    private Integer userCount;
    private LocalDateTime updatedAt;

    public static ChatRoomListResponse from(ChatRoom chatRoom) {
        ChatRoomListResponse response = new ChatRoomListResponse();
        response.roomIdx = chatRoom.getIdx();
        response.title = chatRoom.getTitle();
        response.userCount = chatRoom.getUserCount();
        response.updatedAt = chatRoom.getUpdatedAt();
        return response;
    }
}
