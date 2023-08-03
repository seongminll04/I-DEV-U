package mate.service.project;

import lombok.RequiredArgsConstructor;
import mate.domain.project.Project;
import mate.domain.user.User;
import mate.dto.project.ProjectDto;
import mate.repository.project.ProjectRepository;
import mate.repository.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Random;

@Service
@Transactional
@RequiredArgsConstructor
public class ProjectService {

	private final ProjectRepository projectRepository;
	private final UserRepository userRepository;



	public void registerProject(ProjectDto projectDto) {

		String session = makeRoomCode();

		Project.builder().manager()

	}

	public String makeRoomCode() {
		int leftLimit = 48; // numeral '0'
		int rightLimit = 122; // letter 'z'
		int targetStringLength = 10;
		Random random = new Random();

		String generatedString = random.ints(leftLimit,rightLimit + 1)
				.filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
				.limit(targetStringLength)
				.collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
				.toString();
		return generatedString;
	}
}
