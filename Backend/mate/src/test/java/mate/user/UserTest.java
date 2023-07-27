package mate.user;

import static org.assertj.core.api.AssertionsForClassTypes.*;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import lombok.extern.slf4j.Slf4j;
import mate.domain.User;
import mate.repository.UserRepository;

@Slf4j
@SpringBootTest
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
