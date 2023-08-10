package mate.chat.dto;

import lombok.Data;

@Data
public class ChatRoomUpdateRequest {
    private Integer userIdx;
    private String title;
}
