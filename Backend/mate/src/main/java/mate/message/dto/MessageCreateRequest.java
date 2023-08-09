package mate.message.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageCreateRequest {

    private Integer userIdx;
    private Integer roomIdx;
    private String message;
    private LocalDateTime createdAt;

}
