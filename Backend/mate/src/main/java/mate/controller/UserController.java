package mate.controller;

import mate.domain.User;
import mate.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = {})
public class UserController {

    @Autowired
    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /*
     * 회원가입
     */
    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signup(@RequestBody Map<String, String> map) {
        Map<String, String> res = new HashMap<>();

        User user = new User();

        user.setEmail(map.get("email"));
        user.setPassword(map.get("password"));
        user.setName(map.get("name"));
        user.setNickname(map.get("nickname"));
        user.setGender(Integer.parseInt(map.get("gender")));

        userService.save(user);

        return ResponseEntity.ok(res);
    }

    /*
     * 아이디 중복 확인
     */
    @GetMapping("/signup/emailcheck/{email}")
    public ResponseEntity<Map<String, String>> emailcheck(@PathVariable("email") String email) {
        Map<String, String> res = new HashMap<>();

        List<User> list = userService.emailcheck(email);

        if (list.isEmpty()) {
            res.put("resmsg", "이메일 사용 가능");
            return ResponseEntity.ok(res);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /*
     * 닉네임 중복 확인
     */
    @GetMapping("/signup/nickcheck/{nickname}")
    public ResponseEntity<Map<String, String>> nickcheck(@PathVariable("nickname") String nickname) {
        Map<String, String> res = new HashMap<>();

        List<User> list = userService.nickcheck(nickname);

        if (list.isEmpty()) {
            res.put("resmsg", "닉네임 사용 가능");
            return ResponseEntity.ok(res);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /*
     * 로그인
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> map) {
        Map<String, Object> res = new HashMap<>();

        User loginUser = userService.login(map.get("email"), map.get("password"));

        if (loginUser != null) {
            res.put("resmsg", "로그인 성공");
            res.put("user", loginUser);
            return ResponseEntity.ok(res);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}