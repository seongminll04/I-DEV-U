package mate.service;

import mate.domain.project.ProjectParticipation;
import mate.repository.project.ProjectParticipationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectParticipationService {

    @Autowired
    ProjectParticipationRepository projectParticipationRepository;

    public ProjectParticipationService(ProjectParticipationRepository projectParticipationRepository) {
        this.projectParticipationRepository = projectParticipationRepository;
    }

    public void joinProject(ProjectParticipation projectParticipation) {
        projectParticipationRepository.save(projectParticipation);
    }

    /**
     * 한 프로젝트에 참가중인 참가자 명단 호출
     * @param projectIdx
     */
    public List<ProjectParticipation> findByProjectIdx(int projectIdx){
        return projectParticipationRepository.findByProjectIdx(projectIdx);
    }
}
