package mate.repository.project;

import org.springframework.data.jpa.repository.JpaRepository;

import mate.domain.project.Project;
import mate.domain.project.ProjectTech;

public interface ProjectTechRepository extends JpaRepository<ProjectTech, Integer> {
	void deleteProjectTechsByProject(Project project);
}
