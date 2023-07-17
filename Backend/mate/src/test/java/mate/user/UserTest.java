package mate.user;

import lombok.extern.slf4j.Slf4j;
import mate.domain.User;
import mate.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@Slf4j
@SpringBootTest
public class UserTest {

    @Autowired
    UserRepository userRepository;

    @Test
    void 회원가입(){
        // 새로운 User 생성
        User user = new User();
        user.setId("example");
        user.setPw("password");
        user.setName("John Doe");
        user.setNickname("johndoe");
        user.setBirth(new Date());
        user.setGender("M");
        user.setText("This is a sample user.");

        User saveUser = userRepository.save(user);

        System.out.println(saveUser.toString());

        Optional<User> findUser = userRepository.findById(saveUser.getIdx());

        assertThat(findUser.get().getId()).isEqualTo(user.getId());
    }
}
