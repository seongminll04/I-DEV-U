package mate.alarm.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mate.chat.domain.ChatRoom;
import mate.chat.domain.ChatRoomStatus;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoomResponse {
    
    private Integer idx;
    private String title;
    private ChatRoomStatus type;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private int userCount;
    private List<ChatParticipationResponse> chatRoomUsers = new ArrayList<>();
    
    public static ChatRoomResponse from(ChatRoom chatRoom){
        
        ChatRoomResponse chatRoomResponse = new ChatRoomResponse();
        chatRoomResponse.idx = chatRoom.getIdx();
        chatRoomResponse.title = chatRoom.getTitle();
        chatRoomResponse.type = chatRoom.getType();
        chatRoomResponse.createdAt = chatRoom.getCreatedAt();
        chatRoomResponse.updatedAt = chatRoom.getUpdatedAt();
        chatRoomResponse.userCount = chatRoom.getUserCount();
        chatRoomResponse.chatRoomUsers = ChatParticipationResponse.from(chatRoom.getChatRoomUsers());

        return chatRoomResponse;
    }
    
    
}
