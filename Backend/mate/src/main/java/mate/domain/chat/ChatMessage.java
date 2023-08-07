package mate.domain.chat;

import lombok.Getter;
import mate.domain.user.User;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class ChatMessage {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idx;

    private Integer userIdx;
    private Integer roomIdx;
    private String message;
    private LocalDateTime createdAt;
    private String name;








}
