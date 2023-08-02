package mate.controller;

import lombok.RequiredArgsConstructor;
import mate.domain.user.User;
import mate.dto.user.UserLoginDto;
import mate.dto.user.UserSignUpDto;
import mate.global.login.service.LoginService;
import mate.repository.UserRepository;
import mate.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;


    @GetMapping("/sleep")
    public ResponseEntity<Map<String, String>> test() {
        Map<String, String> map = new HashMap<>();
        map.put("home", "hyeong Suck");

        return ResponseEntity.ok(map);
    }

    /*
     * 회원가입
     */
    @PostMapping("/signUp")
    public ResponseEntity<?> signup(@RequestBody UserSignUpDto userSignUpDto) throws Exception {
        userService.signUp(userSignUpDto);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/signUp/emailCheck/{email}")
    public ResponseEntity<?> emailCheck(@PathVariable String email) throws Exception{
        if (userRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/signUp/nicknameCheck/{nickname}")
    public ResponseEntity<?> nicknameCheck(@PathVariable String nickname) throws Exception{
        System.out.println(1);
        if (userRepository.findByNickname(nickname).isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }


}