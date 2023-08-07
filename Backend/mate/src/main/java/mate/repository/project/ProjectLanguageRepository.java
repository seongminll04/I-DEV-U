package mate.repository.project;

import org.springframework.data.jpa.repository.JpaRepository;

import mate.domain.project.Project;
import mate.domain.project.ProjectLanguage;

public interface ProjectLanguageRepository extends JpaRepository<ProjectLanguage, Integer> {
	void deleteProjectLanguagesByProject(Project project);
}
