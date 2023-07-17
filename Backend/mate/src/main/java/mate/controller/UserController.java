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
    public ResponseEntity<Map<String, String>> signup(User user) {
        Map<String, String> res = new HashMap<>();

        userService.save(user);

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
            res.put("resmsg", "아이디 사용중");
            return ResponseEntity.ok(res);
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
            res.put("resmsg", "닉네임 사용중");
            return ResponseEntity.ok(res);
        }
    }

}
