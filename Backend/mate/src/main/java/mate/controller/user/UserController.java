package mate.controller.user;

import lombok.RequiredArgsConstructor;
import mate.controller.Result;
import mate.domain.user.User;
import mate.domain.user.UserStatus;
import mate.dto.user.UserSignUpDto;
import mate.repository.user.UserRepository;
import mate.service.user.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.springframework.http.ResponseEntity.*;

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

        return ok(map);
    }

    /*
     * 회원가입
     */
    @PostMapping("/signUp")
    public Result signup(@RequestBody UserSignUpDto userSignUpDto) throws Exception {
        userService.signUp(userSignUpDto);
        return Result.builder().status(ok().body("회원 가입 성공")).build();
    }

    @GetMapping("/signUp/emailCheck/{email}")
    public Result emailCheck(@PathVariable String email){
        if (userRepository.findByEmail(email).isPresent()) {
            return Result.builder().status(badRequest().body("이미 있는 이메일 입니다.")).build();
        }
        return Result.builder().status(ok().body("사용가능한 이메일 입니다.")).build();
    }

    @GetMapping("/signUp/nicknameCheck/{nickname}")
    public Result nicknameCheck(@PathVariable String nickname){

        if (userRepository.findByNickname(nickname).isPresent()) {
            return Result.builder().status(badRequest().body("이미 있는 닉네임 입니다.")).build();
        }
        return Result.builder().status(ok().body("사용가능한 닉네임 입니다.")).build();
    }

    @GetMapping("/check/{userIdx}")
    public Result statusCheck(@PathVariable Integer userIdx){
        Optional<User> user = userRepository.findByIdx(userIdx);
        if (user.isEmpty()) {
            return Result.builder().status(badRequest().body("존재하지 않는 회원입니다.")).build();
        }
        UserStatus status = user.get().getStatus();
        Map map = new HashMap();
        map.put("status", status);
        return Result.builder().status(ok().body("회원 상태 코드"))
                .data(map).build();
    }

//    @GetMapping("/detail/{userIdx}")
//    public Result userDetail(@PathVariable Integer userIdx){
//
//        Optional<User> user = userRepository.findByIdx(userIdx);
//        if (user.isEmpty()) {
//            return Result.builder().status(badRequest().body("존재하지 않는 회원입니다.")).build();
//        }
//        User user1 = user.get();
//
//
//    }


}