package mate.user;

import lombok.extern.slf4j.Slf4j;
import mate.domain.user.User;
import mate.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;


@Slf4j
@SpringBootTest
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
