package mate.alarm.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mate.alarm.domain.Alarm;
import mate.alarm.domain.AlarmType;
import mate.domain.user.User;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlarmResponse {

    private Integer idx;
    private Integer fromIdx;
    private String fromNickname;

    private Integer toIdx;
    private String toNickName;

    private AlarmType type;

    private LocalDateTime createdAt;

    public static AlarmResponse from(User fromUser, User toUser, Alarm alarm){
        AlarmResponse alarmResponse = new AlarmResponse();
        alarmResponse.idx = alarm.getIdx();
        alarmResponse.fromIdx = fromUser.getIdx();
        alarmResponse.fromNickname = fromUser.getNickname();
        alarmResponse.toIdx = toUser.getIdx();
        alarmResponse.toNickName = toUser.getNickname();

        alarmResponse.type = alarm.getType();
        alarmResponse.createdAt = alarm.getCreatedAt();

        return alarmResponse;
    }


}
