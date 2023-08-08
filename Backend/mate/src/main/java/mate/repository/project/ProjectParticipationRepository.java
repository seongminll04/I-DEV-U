package mate.repository.project;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import mate.domain.project.ProjectParticipation;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ProjectParticipationRepository extends JpaRepository<ProjectParticipation, Integer> {
	 @Transactional
	 @Modifying
	 @Query(value = "delete from ProjectParticipation p where p.project.idx = :projectIdx and p.user.idx = :userIdx ")
	 void leaveProject(@Param("userIdx") int userIdx, @Param("projectIdx") int projectIdx);
}
