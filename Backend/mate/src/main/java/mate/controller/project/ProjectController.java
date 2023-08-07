package mate.controller.project;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import mate.domain.project.Project;
import mate.dto.project.ProjectDto;
import mate.service.project.ProjectService;

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

		return ResponseEntity.ok(map);
	}

	@GetMapping("/detail/{projectIdx}")
	public ResponseEntity<Map<String, Object>> detailProject(@PathVariable("projectIdx") int projectIdx) {
		Map<String, Object> map = new HashMap<>();

		map.put("resmsg", "프로젝트 조회 성공");

		return ResponseEntity.ok(map);
	}

}
