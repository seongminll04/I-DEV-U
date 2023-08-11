package mate.chat.dto;

import lombok.Data;
import mate.chat.domain.ChatParticipation;

@Data
public class ChatRoomMasterResponse {
    private Integer roomIdx;
    private Integer masterIdx;

    public static ChatRoomMasterResponse from(Integer roomIdx, Integer userIdx){
        ChatRoomMasterResponse chatRoomMasterResponse = new ChatRoomMasterResponse();
        chatRoomMasterResponse.roomIdx = roomIdx;
        chatRoomMasterResponse.masterIdx = userIdx;
        return chatRoomMasterResponse;
    }
}
