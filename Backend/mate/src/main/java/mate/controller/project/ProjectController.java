package mate.controller.project;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import mate.domain.project.Project;
import mate.dto.project.ProjectDto;
import mate.dto.project.ProjectParticipationDto;
import mate.service.project.ProjectService;

@RestController
@RequestMapping("/project")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ProjectController {

	private final ProjectService projectService;

	@PostMapping("/register")
	public ResponseEntity<Map<String, Object>> registerProject(@RequestBody ProjectDto projectDto) {
		Map<String, Object> map = new HashMap<>();

		System.out.println(projectDto);

		Project project = projectService.registerProject(projectDto);

		map.put("resmsg", "프로젝트 생성 성공");

		return ResponseEntity.ok(map);
	}

	@GetMapping("/detail/{projectIdx}")
	public ResponseEntity<Map<String, Object>> detailProject(@PathVariable("projectIdx") int projectIdx) {
		Map<String, Object> map = new HashMap<>();

		Project project = projectService.detailProject(projectIdx);

		map.put("project", project);
		map.put("resmsg", "프로젝트 조회 성공");

		return ResponseEntity.ok(map);
	}

	@PostMapping("/enter")
	public ResponseEntity<Map<String, Object>> enterProject(
		@RequestBody ProjectParticipationDto projectParticipationDto) {
		Map<String, Object> map = new HashMap<>();

		projectService.enterProject(projectParticipationDto);

		return ResponseEntity.ok(map);
	}

	@PutMapping("/modify")
	public ResponseEntity<Map<String, Object>> modifyProject(@RequestBody ProjectDto projectDto) {
		Map<String, Object> map = new HashMap<>();

		try {
			Project project = projectService.modifyProject(projectDto);
			map.put("resmsg", "프로젝트 수정 성공");
		} catch (Exception e) {
			map.put("resmsg", "프로젝트 수정 실패");
		}

		return ResponseEntity.ok(map);
	}

	@DeleteMapping("/delete/{projectIdx}")
	public ResponseEntity<Map<String, Object>> deleteProject(@PathVariable("projectIdx") int projectIdx) {
		Map<String, Object> map = new HashMap<>();

		try {
			projectService.deleteProject(projectIdx);
			map.put("resmsg", "프로젝트 삭제 성공");
		} catch (Exception e) {
			map.put("resmsg", "프로젝트 삭제 실패");
		}

		return ResponseEntity.ok(map);
	}

	@GetMapping(value = {"/list/{keyword}", "/list"})
	public ResponseEntity<Map<String, Object>> listProject(
		@PathVariable(value = "keyword", required = false) String keyword) {
		Map<String, Object> map = new HashMap<>();

		try {
			List<Project> list = projectService.listProject(keyword);
			map.put("list", list);
			map.put("resmsg", "프로젝트 리스트 조회 성공");
		} catch (Exception e) {
			map.put("resmsg", "프로젝트 리스트 조회 실패");
		}

		return ResponseEntity.ok(map);
	}
}
