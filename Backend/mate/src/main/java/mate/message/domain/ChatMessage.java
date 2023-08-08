package mate.message.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idx")
    private Integer idx;

    private Integer roomIdx;

    private Integer userIdx;

    private String name;

    private String message;

    @CreatedDate
    private LocalDateTime createdAt;

    public static ChatMessage createMessage(Integer roomIdx, Integer userIdx, String name, String message) {
        ChatMessage msg = new ChatMessage();
        msg.roomIdx = roomIdx;
        msg.userIdx = userIdx;
        msg.name = name;
        msg.message = message;
        msg.createdAt = LocalDateTime.now();
        return msg;
    }
}