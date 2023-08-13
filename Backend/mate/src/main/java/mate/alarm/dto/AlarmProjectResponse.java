package mate.alarm.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AlarmProjectResponse {

    private AlarmResponse alarmResponse;
    private ProjectResponse projectResponse;

    public static AlarmProjectResponse from(AlarmResponse alarmResponse, ProjectResponse projectResponse){
        AlarmProjectResponse alarmProjectResponse = new AlarmProjectResponse();
        alarmProjectResponse.alarmResponse = alarmResponse;
        alarmProjectResponse.projectResponse = projectResponse;
        return alarmProjectResponse;
    }
}
