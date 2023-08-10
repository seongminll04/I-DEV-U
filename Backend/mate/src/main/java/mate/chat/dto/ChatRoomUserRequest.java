package mate.chat.dto;


import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ChatRoomUserRequest {

    private Integer userIdx;
    private LocalDateTime updatedAt;

}
