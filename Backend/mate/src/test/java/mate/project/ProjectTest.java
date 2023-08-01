package mate.project;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import lombok.extern.slf4j.Slf4j;
import mate.repository.ProjectRepository;

@Slf4j
@SpringBootTest
@Transactional
public class ProjectTest {
	
	@Autowired
	ProjectRepository projectRepository;
}
