package mate.user;

import lombok.extern.slf4j.Slf4j;
import mate.domain.User;
import mate.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@Slf4j
@SpringBootTest
public class UserTest {

    @Autowired
    UserRepository userRepository;

    @Test
    void 닉네임_중복체크() {
        String nickname = "admin";

        List<User> list = userRepository.findByNickname(nickname);

        assertThat(list.size()).isEqualTo(1);
    }

}
