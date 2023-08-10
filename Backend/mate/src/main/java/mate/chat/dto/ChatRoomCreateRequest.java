package mate.chat.dto;

import lombok.Data;

@Data
public class ChatRoomCreateRequest {

    private Integer userIdx;
    private String title;

}
