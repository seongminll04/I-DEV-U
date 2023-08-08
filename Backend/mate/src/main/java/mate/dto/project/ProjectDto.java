package mate.dto.project;

import java.util.List;

import lombok.Data;
import mate.domain.project.ProjectLanguage;
import mate.domain.project.ProjectTech;

@Data
public class ProjectDto {

	private Integer idx;
	private Integer managerIdx;
	private String title;
	private String content;
	private Integer totalNum;
	private Integer nowNum;
	private String status;
	private Integer front;
	private Integer maxFront;
	private Integer back;
	private Integer maxBack;
	private String type;
	private String session;
	private List<ProjectLanguage> languageList;
	private List<ProjectTech> techList;
}