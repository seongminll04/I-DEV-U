package mate.controller;

import lombok.RequiredArgsConstructor;
import mate.domain.project.Project;
import mate.domain.project.ProjectParticipation;
import mate.service.ProjectParticipationService;
import mate.service.ProjectService;
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
    private final ProjectParticipationService projectParticipationService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerProject(Project project) {
        // 프로젝트 생성
        projectService.registerProject(project);

        Map<String, Object> map = new HashMap<>();
        map.put("resmsg", "프로젝트 생성완료");
        return ResponseEntity.ok(map);
    }

    @PostMapping("/video/propose")
    public ResponseEntity<Map<String, Object>> joinProject(@RequestParam("projectIdx") int projectIdx, @RequestParam("userIdx") int userIdx) throws Exception {
        ProjectParticipation info = new ProjectParticipation();
        info.setIdx(0);
        info.setProject(projectService.getProject(projectIdx));
        info.setUserIdx(userIdx);
        projectParticipationService.joinProject(info);
        Map<String, Object> map = new HashMap<>();
        map.put("resmsg", "참가 신청 완료");
        return ResponseEntity.ok(map);
    }

    @GetMapping("/participants/{projectIdx}")
    public ResponseEntity<Map<String, Object>> getParticipants(@PathVariable int projectIdx){
        Map<String, Object> map = new HashMap<>();
        map.put("list", projectParticipationService.findByProjectIdx(projectIdx));
        return ResponseEntity.ok(map);
    }

    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getProjectList() {
        Map<String, Object> map = new HashMap<>();
        map.put("list", projectService.listProject());
        return ResponseEntity.ok(map);
    }
}
