package mate.controller.user;

import lombok.RequiredArgsConstructor;
import mate.controller.Result;
import mate.domain.basic.BasicAnswer;
import mate.repository.user.BasicRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Optional;
import java.util.Map;
import static org.springframework.http.ResponseEntity.badRequest;
import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/basic")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class BasicController {

    private final BasicRepository basicRepository;

//    @GetMapping("/basicSurvey/{userIdx}")
//    public Result surveyCheck(@PathVariable Integer userIdx){
//        Optional<BasicAnswer> basicAnswer = basicRepository.findByUser(userIdx);
//        Map map = new HashMap();
//        if (basicAnswer.isEmpty()){
//            map.put("survey", "NO");
//            return Result.builder().status(badRequest().body("설문 해야 함")).data(map).build();
//        }
//        map.put("survey", "YES");
//        return Result.builder().status(ok().body("설문 완료")).data(map).build();
//    }

}
