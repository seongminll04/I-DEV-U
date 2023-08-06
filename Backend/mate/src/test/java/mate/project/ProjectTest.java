package mate.project;

import javax.transaction.Transactional;

import mate.domain.project.Project;
import mate.domain.project.ProjectLanguage;
import mate.domain.project.ProjectTech;
import mate.dto.project.ProjectDto;
import mate.service.project.ProjectService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import lombok.extern.slf4j.Slf4j;
import mate.repository.project.ProjectParticipationRepository;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@SpringBootTest
//@Transactional
public class ProjectTest {

    @Autowired
    ProjectService projectService;

    @Test
    void 프로젝트_생성() {
        ProjectDto projectDto = new ProjectDto();

        List<ProjectTech> techs = new ArrayList<>();
        List<ProjectLanguage> languages = new ArrayList<>();

        projectDto.setManagerIdx(5);
        projectDto.setTitle("제목1");
        projectDto.setContent("내용1");
        projectDto.setTotalNum(6);
        projectDto.setNowNum(1);
        projectDto.setFront(0);
        projectDto.setMaxFront(3);
        projectDto.setBack(1);
        projectDto.setMaxBack(3);
        projectDto.setType("Project");

        Project project = projectService.registerProject(projectDto);

        techs.add(ProjectTech.builder()
                .project(project)
                .tech("Spring boot").build());
        techs.add(ProjectTech.builder()
                .project(project)
                .tech("Mysql").build());
        languages.add(ProjectLanguage.builder()
                .project(project)
                .language("Java").build());
        languages.add(ProjectLanguage.builder()
                .project(project)
                .language("JS").build());
    }

}
