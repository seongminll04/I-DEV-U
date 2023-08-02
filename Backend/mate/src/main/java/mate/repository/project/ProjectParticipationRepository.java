package mate.repository.project;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mate.domain.project.ProjectParticipation;

@Repository
public interface ProjectParticipationRepository extends JpaRepository<ProjectParticipation, Integer> {
}
