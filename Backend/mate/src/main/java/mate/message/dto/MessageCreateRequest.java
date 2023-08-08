package mate.message.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageCreateRequest {

    private Integer roomIdx;

    private Integer userIdx;

    private String name;

    private String message;

}
