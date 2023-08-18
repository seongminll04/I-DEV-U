package mate.dto.project;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mate.alarm.dto.UserResponse;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProjectResponse {

    private List<UserResponse> userList;
    private String type;


    public static ProjectResponse from(List<UserResponse> userResponse, String type){
        ProjectResponse projectResponse = new ProjectResponse();
        projectResponse.userList = userResponse;
        projectResponse.type = type;

        return projectResponse;
    }
}
