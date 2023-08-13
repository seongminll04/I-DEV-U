package mate.alarm.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mate.alarm.domain.Alarm;
import mate.alarm.domain.AlarmType;

import java.time.LocalDateTime;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class AlarmResponse {

    private Integer idx;
    private UserResponse fromUser;
    private UserResponse toUser;
    private AlarmType type;
    private LocalDateTime createdAt;

    public static AlarmResponse from (Alarm alarm, UserResponse fromUser, UserResponse toUser){

        AlarmResponse alarmResponse = new AlarmResponse();
        alarmResponse.idx= alarm.getIdx();
        alarmResponse.fromUser = fromUser;
        alarmResponse.toUser = toUser;
        alarmResponse.type = alarm.getType();
        alarmResponse.createdAt = alarm.getCreatedAt();

        return alarmResponse;
    }


}
