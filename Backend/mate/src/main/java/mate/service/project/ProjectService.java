package mate.service.project;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import mate.domain.project.Project;
import mate.domain.project.ProjectLanguage;
import mate.domain.project.ProjectParticipation;
import mate.domain.project.ProjectTech;
import mate.domain.user.User;
import mate.dto.project.ProjectDto;
import mate.dto.project.ProjectParticipationDto;
import mate.repository.project.ProjectLanguageRepository;
import mate.repository.project.ProjectParticipationRepository;
import mate.repository.project.ProjectRepository;
import mate.repository.project.ProjectTechRepository;
import mate.repository.user.UserRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class ProjectService {

	private final ProjectRepository projectRepository;
	private final UserRepository userRepository;
	private final ProjectParticipationRepository projectParticipationRepository;
	private final ProjectTechRepository projectTechRepository;
	private final ProjectLanguageRepository projectLanguageRepository;

	public Project registerProject(ProjectDto projectDto) {
		User user = userRepository.findById(projectDto.getUserIdx()).get();

		Project project = projectRepository.save(Project.builder()
			.manager(user)
			.title(projectDto.getTitle())
			.content(projectDto.getContent())
			.totalNum(projectDto.getTotalNum())
			.nowNum(projectDto.getNowNum())
			.front(projectDto.getFront())
			.max_front(projectDto.getMax_front())
			.back(projectDto.getBack())
			.max_back(projectDto.getMax_back())
			.session(projectDto.getSession())
			.type(projectDto.getType()).build());

		projectParticipationRepository.save(ProjectParticipation.builder()
			.project(project)
			.user(user).build());

		List<ProjectTech> techs = new ArrayList<>();

		// 일단 비어있는 projectTechDto의 project에 방금 생성된 project 삽입
		for (ProjectTech tech : projectDto.getTechList()) {
			techs.add(ProjectTech.builder()
				.project(project)
				.tech(tech.getTech())
				.build());
		}

		List<ProjectLanguage> languages = new ArrayList<>();

		// 일단 비어있는 projectLanguageDto의 project에 방금 생성된 project 삽입
		for (ProjectLanguage language : projectDto.getLanguageList()) {
			languages.add(ProjectLanguage.builder()
				.project(project)
				.language(language.getLanguage())
				.build());
		}

		projectTechRepository.saveAll(techs);
		projectLanguageRepository.saveAll(languages);

		return project;
	}

	public Project detailProject(int projectIdx) {
		Project project = projectRepository.findById(projectIdx).get();

		return project;
	}

	public void enterProject(ProjectParticipationDto dto) {
		User user = userRepository.findByIdx(dto.getUserIdx()).get();
		Project project = projectRepository.findById(dto.getProjectIdx()).get();

		ProjectParticipation projectParticipation = projectParticipationRepository.save(ProjectParticipation.builder()
			.project(project)
			.user(user)
			.build());

		projectRepository.plusnowNum(project.getIdx());
	}

	public void leaveProject(int userIdx, int projectIdx) {
		projectParticipationRepository.leaveProject(userIdx, projectIdx);
		projectRepository.minusnowNum(projectIdx);
	}

	public Project modifyProject(ProjectDto projectDto) {
		User user = userRepository.findById(projectDto.getUserIdx()).get();

		Project project = projectRepository.save(Project.builder()
			.idx(projectDto.getIdx())
			.manager(user)
			.title(projectDto.getTitle())
			.content(projectDto.getContent())
			.totalNum(projectDto.getTotalNum())
			.nowNum(projectDto.getNowNum())
			.front(projectDto.getFront())
			.max_front(projectDto.getMax_front())
			.back(projectDto.getBack())
			.max_back(projectDto.getMax_back())
			.type(projectDto.getType()).build());

		List<ProjectTech> techs = new ArrayList<>();

		for (ProjectTech tech : projectDto.getTechList()) {
			techs.add(ProjectTech.builder()
				// .idx(tech.getIdx())
				.project(project)
				.tech(tech.getTech())
				.build());
		}

		List<ProjectLanguage> languages = new ArrayList<>();

		// 일단 비어있는 projectLanguageDto의 project에 방금 생성된 project 삽입
		for (ProjectLanguage language : projectDto.getLanguageList()) {
			languages.add(ProjectLanguage.builder()
				// .idx(language.getIdx())
				.project(project)
				.language(language.getLanguage())
				.build());
		}

		projectTechRepository.deleteProjectTechsByProject(project);
		projectLanguageRepository.deleteProjectLanguagesByProject(project);

		projectTechRepository.saveAll(techs);
		projectLanguageRepository.saveAll(languages);

		return project;
	}

	public void deleteProject(int projectIdx) {
		projectRepository.deleteById(projectIdx);
	}

	public List<Project> listProject(String keyword) {
		if (keyword == null)
			return projectRepository.findAll();
		else
			return projectRepository.findProjectsByTitleOrContent(keyword);
	}

	public String makeRoomCode() {
		int leftLimit = 48; // numeral '0'
		int rightLimit = 122; // letter 'z'
		int targetStringLength = 10;
		Random random = new Random();

		String generatedString = random.ints(leftLimit, rightLimit + 1)
			.filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
			.limit(targetStringLength)
			.collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
			.toString();
		return generatedString;
	}
}
