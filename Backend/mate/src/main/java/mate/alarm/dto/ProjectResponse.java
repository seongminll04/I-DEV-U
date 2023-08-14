package mate.alarm.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mate.domain.project.Project;
import mate.domain.user.User;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectResponse{

    private Integer idx;
    private UserResponse manager;
    private String title;
    private String content;
    private Integer totalNum;
    private Integer nowNum;
    private String status;
    private Integer front;
    private Integer maxFront;
    private Integer back;
    private Integer maxBack;
    private String session;
    private String text;
    private String type;

    public static ProjectResponse from(Project project){

        ProjectResponse projectResponse = new ProjectResponse();
        projectResponse.idx = project.getIdx();
        projectResponse.title = project.getTitle();
        projectResponse.content = project.getContent();
        projectResponse.totalNum = project.getTotalNum();
        projectResponse.nowNum = project.getNowNum();
        projectResponse.status = project.getStatus();
        projectResponse.front = project.getFront();
        projectResponse.maxFront = project.getMax_front();
        projectResponse.back = project.getBack();
        projectResponse.maxBack = project.getMax_back();
        projectResponse.session = project.getSession();
        projectResponse.text = project.getText();
        projectResponse.type = project.getType();
        projectResponse.manager = UserResponse.from(project.getManager());

        return projectResponse;
    }

}
