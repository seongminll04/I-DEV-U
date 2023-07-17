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

//    @Test
//    void 회원가입(){
//        // 새로운 User 생성
//        User user = new User();
//        user.setId("example");
//        user.setPw("password");
//        user.setName("John Doe");
//        user.setNickname("johndoe");
//        user.setBirth(new Date());
//        user.setGender("M");
//        user.setText("This is a sample user.");
//
//        User saveUser = userRepository.save(user);
//
//        Optional<User> findUser = userRepository.findById(saveUser.getIdx());
//
//        assertThat(findUser.get().getId()).isEqualTo(user.getId());
//    }

    @Test
    void 아이디_중복체크() {
        String id = "admin@admin";

        List<User> list = userRepository.findById(id);

        assertThat(list.size()).isEqualTo(1);
    }

    @Test
    void 닉네임_중복체크() {
        String nickname = "admin";

        List<User> list = userRepository.findByNickname(nickname);

        assertThat(list.size()).isEqualTo(1);
    }
}
