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

        user.setId(map.get("email"));
        user.setPw(map.get("password"));
        user.setName(map.get("name"));
        user.setNickname(map.get("nickname"));
//        user.setBirth(new Date(map.get("birthday")));
        user.setGender(Integer.parseInt(map.get("gender")));

        userService.save(user);
        System.out.println(user);
        return ResponseEntity.ok(res);
    }
    
    /*
    * 아이디 중복 확인
    */
    @GetMapping("/signup/idcheck/{id}")
    public ResponseEntity<Map<String, String>> idcheck(@PathVariable("id") String id) {
        Map<String, String> res = new HashMap<>();

        List<User> list = userService.idcheck(id);

        if (list.isEmpty()) {
            res.put("resmsg", "아이디 사용 가능");
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

        System.out.println(map.get("id") + " " + map.get("pw"));

        User loginUser = userService.login(map.get("id"), map.get("pw"));

        if (loginUser != null) {
            res.put("resmsg", "로그인 성공");
            res.put("user", loginUser);
            return ResponseEntity.ok(res);
        } else {
            res.put("resmsg", "로그인 실패");
            return ResponseEntity.notFound().build();
        }
    }
}
