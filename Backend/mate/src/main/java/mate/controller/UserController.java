package mate.controller;

import lombok.RequiredArgsConstructor;
import mate.dto.user.UserLoginDto;
import mate.dto.user.UserSignUpDto;
import mate.global.login.service.LoginService;
import mate.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = {})
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final LoginService loginService;


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
        System.out.println(1);
        userService.signUp(userSignUpDto);

        return ResponseEntity.ok().build();
    }


}