package mate.service.project;

import lombok.RequiredArgsConstructor;
import mate.domain.project.Project;
import mate.repository.project.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProjectService {

	private final ProjectRepository projectRepository;


	public void registerProject(Project project) {
		projectRepository.save(project);
	}
}
