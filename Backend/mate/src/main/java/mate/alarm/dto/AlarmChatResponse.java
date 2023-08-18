package mate.alarm.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mate.alarm.domain.Alarm;
import mate.chat.domain.ChatRoom;
import mate.domain.user.User;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AlarmChatResponse {

    private AlarmResponse alarmResponse;
    private ChatRoomResponse chatRoomResponse;


    public static AlarmChatResponse from(AlarmResponse alarmResponse, ChatRoomResponse chatRoomResponse){
        AlarmChatResponse alarmChatResponse = new AlarmChatResponse();
        alarmChatResponse.alarmResponse = alarmResponse;
        alarmChatResponse.chatRoomResponse = chatRoomResponse;

        return alarmChatResponse;
    }


}
