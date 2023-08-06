package mate.dto.project;

import lombok.Data;
import mate.domain.project.Project;

@Data
public class ProjectTechDto {
    private Project project;
    private String tech;
}
