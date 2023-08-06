package mate.controller.project;

import lombok.RequiredArgsConstructor;
import mate.controller.Result;
import mate.domain.project.Project;
import mate.dto.project.ProjectDto;
import mate.service.project.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/project")
@CrossOrigin(origins = {})
@RequiredArgsConstructor
public class ProjectController {

	private final ProjectService projectService;

	@PostMapping("/register")
	public ResponseEntity<Map<String, Object>> registerProject(@RequestBody ProjectDto projectDto) {
		Map<String, Object> map = new HashMap<>();

		Project project = projectService.registerProject(projectDto);

		map.put("resmsg", "프로젝트 생성 성공");
//		map.put("data", project);

		return ResponseEntity.ok(map);
	}
}
