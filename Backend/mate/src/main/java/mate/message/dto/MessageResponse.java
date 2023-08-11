package mate.message.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mate.message.domain.ChatMessage;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageResponse {

    private Integer idx;

    private Integer roomIdx;

    private Integer userIdx;

    private String nickname;

    private String message;

    private LocalDateTime createdAt;

    public static MessageResponse from(ChatMessage message){
        MessageResponse response = new MessageResponse();
        response.idx = message.getIdx();
        response.roomIdx = message.getRoomIdx();
        response.userIdx = message.getUserIdx();
        response.nickname = message.getNickname();
        response.message = message.getMessage();
        response.createdAt = message.getCreatedAt();
        return response;
    }

}
