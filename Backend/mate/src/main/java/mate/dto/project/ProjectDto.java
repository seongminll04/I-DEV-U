package mate.dto.project;

import lombok.Data;

import java.util.List;

@Data
public class ProjectDto {

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
	private List<String> language;
	private String session;

}