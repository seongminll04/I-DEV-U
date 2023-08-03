package mate.controller.project;

import mate.controller.Result;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import mate.domain.project.Project;
import mate.service.project.ProjectService;

@RestController
@RequestMapping("/project")
@CrossOrigin(origins = {})
@RequiredArgsConstructor
public class ProjectController {

	private final ProjectService projectService;

	@PostMapping("/register")
	public Result registerProject(@RequestBody Project project) {

		System.out.println(project);

		return Result.builder().build();
	}
}
