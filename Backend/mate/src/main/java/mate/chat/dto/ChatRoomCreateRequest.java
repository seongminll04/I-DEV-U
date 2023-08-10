package mate.chat.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ChatRoomCreateRequest {

    private Integer userIdx;
    private String title;
    private LocalDateTime createdAt;

}
