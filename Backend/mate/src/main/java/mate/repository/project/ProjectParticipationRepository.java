package mate.repository.project;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mate.domain.project.ProjectParticipation;

@Repository
public interface ProjectParticipationRepository extends JpaRepository<ProjectParticipation, Integer> {
	// @Modifying
	// @Query(value = "insert into ProjectParticipation (project_idx, user_idx) values(:projectIdx, :userIdx)")
	// void enterProject(@Param("userIdx") long userIdx, @Param("projectIdx") long projectIdx);
}
