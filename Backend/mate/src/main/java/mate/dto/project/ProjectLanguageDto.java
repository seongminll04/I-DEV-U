package mate.dto.project;

import lombok.Data;
import mate.domain.project.Project;

@Data
public class ProjectLanguageDto {
    private Project project;
    private String language;
}
