package mate.chat.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoomIdxResponse {

    private Integer roomIdx;

    public static ChatRoomIdxResponse from(Integer roomIdx){
        ChatRoomIdxResponse response = new ChatRoomIdxResponse();
        response.roomIdx = roomIdx;

        return response;
    }
}
