package mate.alarm.dto;

import lombok.Data;
import mate.alarm.domain.Alarm;
import mate.alarm.domain.AlarmType;
import mate.domain.project.Project;
import mate.domain.user.User;

import java.time.LocalDateTime;

@Data
public class AlarmProjectResponse {

    private Integer idx;
    private Integer fromIdx;
    private String fromNickname;
    private AlarmType type;
    private LocalDateTime createdAt;
    private Integer projectIdx;
    private Integer managerIdx;
    private String managerNickname;

    public static AlarmProjectResponse from(User fromUser, Project project, Alarm alarm){

        AlarmProjectResponse alarmProjectResponse = new AlarmProjectResponse();
        alarmProjectResponse.idx = alarm.getIdx();
        alarmProjectResponse.fromIdx = fromUser.getIdx();
        alarmProjectResponse.fromNickname = fromUser.getNickname();
        alarmProjectResponse.type = alarm.getType();
        alarmProjectResponse.createdAt = alarm.getCreatedAt();
        alarmProjectResponse.projectIdx = project.getIdx();
        alarmProjectResponse.managerIdx = project.getManager().getIdx();
        alarmProjectResponse.managerNickname = project.getManager().getNickname();

        return alarmProjectResponse;
    }
}
