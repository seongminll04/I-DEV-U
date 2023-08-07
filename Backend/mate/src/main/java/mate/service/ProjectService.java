package mate.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mate.domain.project.Project;
import mate.repository.ProjectRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

	@Autowired
	ProjectRepository projectRepository;

	public ProjectService(ProjectRepository projectRepository) {
		this.projectRepository = projectRepository;
	}

	public void registerProject(Project project) {
		projectRepository.save(project);
	}

	public List<Project> listProject() {
		return projectRepository.findAll();
	}

	public Project getProject(int projectIdx) throws Exception {
		Optional<Project> project = projectRepository.findById(projectIdx);

		if (project.isPresent()) {
			return project.get();
		} else {
			throw new Exception("존재하지 않는 프로젝트 입니다");
		}
	}
}
