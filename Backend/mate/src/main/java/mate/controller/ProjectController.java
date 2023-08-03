package mate.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import mate.domain.project.Project;
import mate.service.ProjectService;

@RestController
@RequestMapping("/project")
@CrossOrigin(origins = {})
@RequiredArgsConstructor
public class ProjectController {

	@Autowired
	ProjectService projectService;

	@PostMapping("/register")
	public ResponseEntity<?> registerProject(@RequestBody Project project) {

		try {
			projectService.registerProject(project);

			return new ResponseEntity<>("프로젝트구인 작성 성공", HttpStatus.valueOf(200));
		} catch (Exception e) {
			return new ResponseEntity<>("프로젝트구인 작성 실패", HttpStatus.valueOf(400));
		}
	}
}
