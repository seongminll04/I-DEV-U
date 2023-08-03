package mate.repository.project;

import mate.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mate.domain.project.ProjectParticipation;

import java.util.List;

@Repository
public interface ProjectParticipationRepository extends JpaRepository<ProjectParticipation, Integer> {
    List<ProjectParticipation> findByProjectIdx(int projectIdx);
}
