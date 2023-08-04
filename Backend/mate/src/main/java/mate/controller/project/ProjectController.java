package mate.controller.project;

import lombok.RequiredArgsConstructor;
import mate.controller.Result;
import mate.domain.project.Project;
import mate.dto.project.ProjectDto;
import mate.service.project.ProjectService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/project")
@CrossOrigin(origins = {})
@RequiredArgsConstructor
public class ProjectController {

	private final ProjectService projectService;

	@PostMapping("/register")
	public Result registerProject(@RequestBody ProjectDto projectDto) {

		System.out.println(projectDto);

		return Result.builder().build();
	}
}
