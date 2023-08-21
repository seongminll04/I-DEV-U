package mate.alarm.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mate.chat.domain.ChatParticipation;
import mate.chat.domain.ChatRoom;
import mate.chat.domain.Role;
import mate.domain.user.User;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatParticipationResponse {

    private Integer idx;
    private Role role;
    private UserResponse user;

    public static List<ChatParticipationResponse> from(List<ChatParticipation> chatParticipations){

        List<ChatParticipationResponse> list = new ArrayList<>();
        for (ChatParticipation chatParticipation : chatParticipations) {
            ChatParticipationResponse response = new ChatParticipationResponse();
            response.idx = chatParticipation.getIdx();
            response.role = chatParticipation.getRole();
            response.user = UserResponse.from(chatParticipation.getUser());
            list.add(response);
        }
        return list;
    }
}
