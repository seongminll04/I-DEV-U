package mate.alarm.dto;

import lombok.Data;
import mate.alarm.domain.Alarm;
import mate.alarm.domain.AlarmType;
import mate.chat.dto.ChatRoomMasterResponse;
import mate.domain.project.Project;
import mate.domain.user.User;

import java.time.LocalDateTime;

@Data
public class AlarmChatResponse {
    private Integer idx;
    private Integer fromIdx;
    private String fromNickname;
    private AlarmType type;
    private LocalDateTime createdAt;
    private Integer chatRoomIdx;
    private Integer masterIdx;


    public static AlarmChatResponse from(User fromUser, ChatRoomMasterResponse response, Alarm alarm){

        AlarmChatResponse alarmChatResponse = new AlarmChatResponse();
        alarmChatResponse.idx = alarm.getIdx();
        alarmChatResponse.fromIdx = fromUser.getIdx();
        alarmChatResponse.fromNickname = fromUser.getNickname();
        alarmChatResponse.type = alarm.getType();
        alarmChatResponse.createdAt = alarm.getCreatedAt();
        alarmChatResponse.chatRoomIdx = response.getRoomIdx();
        alarmChatResponse.masterIdx = response.getMasterIdx();

        return alarmChatResponse;
    }


}
