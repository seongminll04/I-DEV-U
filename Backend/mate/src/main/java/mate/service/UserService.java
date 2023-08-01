package mate.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mate.domain.user.Role;
import mate.domain.user.User;
import mate.domain.user.UserStatus;
import mate.dto.user.UserLoginDto;
import mate.dto.user.UserSignUpDto;
import mate.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public void signUp(UserSignUpDto userSignUpDto) throws Exception {

        if (userRepository.findByEmail(userSignUpDto.getEmail()).isPresent()) {
            throw new Exception("이미 존재하는 이메일입니다.");
        }

        if (userRepository.findByNickname(userSignUpDto.getNickname()).isPresent()) {
            throw new Exception("이미 존재하는 닉네임입니다.");
        }

        User user = User.builder()
                .email(userSignUpDto.getEmail())
                .password(userSignUpDto.getPassword())
                .name(userSignUpDto.getName())
                .nickname(userSignUpDto.getNickname())
                .birth(userSignUpDto.getBirthday())
                .gender(userSignUpDto.getGender())
                .status(UserStatus.A)
                .role(Role.USER)
                .build();

        user.passwordEncode(passwordEncoder);
        userRepository.save(user);

    }

    public User login(UserLoginDto userLoginDto) throws Exception{

        Optional<User> user = userRepository.findByEmail(userLoginDto.getEmail());

        if (user.isEmpty()) {
            throw new Exception("존재 하지 않는 회원 입니다.");
        }
//        userLoginDto.passwordEncode(passwordEncoder);
        System.out.println(userLoginDto);
        if (user.get().getPassword().equals(userLoginDto.getPassword())){
            return user.get();
        }

        throw new Exception("비밀번호가 틀립니다.");
    }
}