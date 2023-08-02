package mate.project;

import javax.transaction.Transactional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import lombok.extern.slf4j.Slf4j;
import mate.repository.ProjectRepository;
<<<<<<< HEAD
=======
import mate.repository.project.ProjectParticipationRepository;
@Slf4j
@Transactional
public class ProjectTest {
<<<<<<< HEAD
	
	@Autowired
	ProjectRepository projectRepository;
=======

	@Autowired
	ProjectRepository projectRepository;

	@Autowired
	ProjectParticipationRepository projectParticipationRepository;

	@Test
	void 프로젝트_쿼리테스트() {
		log.info("프로젝트 관련 데이터 -> {}", projectRepository.findAll());
	}

	@Test
	void 프로젝트_참여자_쿼리테스트() {
		log.info("프로젝트 참여자 -> {}", projectParticipationRepository.findAll());
	}
>>>>>>> develop-be
}
