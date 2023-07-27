package mate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mate.domain.project.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {

}
