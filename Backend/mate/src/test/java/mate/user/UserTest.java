package mate.user;

import lombok.extern.slf4j.Slf4j;
import mate.domain.User;
import mate.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import javax.transaction.Transactional;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;


@Slf4j
@SpringBootTest
@RunWith(SpringRunner.class)
@Transactional
public class UserTest {

	@Autowired
	UserRepository userRepository;

	@Test
	void nickName_check() {
		String nickname = "admin";

		List<User> list = userRepository.findByNickname(nickname);

		assertThat(list.size()).isEqualTo(1);
	}

}
