package mate.chat.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ChatRoomUpdateRequest {
    private Integer userIdx;
    private String title;
    private LocalDateTime updatedAt;
}
