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
    private Integer idx;

    private Integer roomIdx;

    private Integer userIdx;

    private String nickname;

    private String message;

    @CreatedDate
    private LocalDateTime createdAt;

    public static ChatMessage createMessage(Integer roomIdx, Integer userIdx, String nickname, String message, LocalDateTime createdAt) {
        ChatMessage msg = new ChatMessage();
        msg.roomIdx = roomIdx;
        msg.userIdx = userIdx;
        msg.nickname = nickname;
        msg.message = message;
        msg.createdAt = createdAt;
        return msg;
    }
}