package mate.dto;

import lombok.Data;
import mate.domain.user.NotificationType;
import java.time.LocalDateTime;

@Data
public class NotificationDto {
    private Integer userIdx;
    private String nickname;
    private String content;
    private LocalDateTime createdAt;
    private NotificationType dataType;
    private String checked;
}
