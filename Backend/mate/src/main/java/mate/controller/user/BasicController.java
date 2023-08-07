package mate.controller.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mate.controller.Result;
import mate.domain.basic.BasicAnswer;
import mate.dto.user.UserBasicSurvey;
import mate.repository.user.BasicRepository;
import mate.service.user.BasicService;
import org.springframework.web.bind.annotation.*;

import java.io.Console;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.Map;
import static org.springframework.http.ResponseEntity.badRequest;
import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/basicSurvey")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Slf4j
public class BasicController {

    private final BasicRepository basicRepository;
    private final BasicService basicService;

    @GetMapping("/{userIdx}")
    public Result surveyCheck(@PathVariable Integer userIdx){
        List<BasicAnswer> basicAnswer = basicRepository.findByUser(userIdx);
        Map map = new HashMap();
        if (basicAnswer.isEmpty()){
            map.put("survey", "NO");
            return Result.builder().status(badRequest().body("설문 해야 함")).data(map).build();
        }
        map.put("survey", "YES");
        return Result.builder().status(ok().body("설문 완료")).data(map).build();
    }

    @PostMapping("/create")
    public Result surveyCreate(@RequestBody UserBasicSurvey userBasicSurvey) throws Exception{

        log.info("userBasicSurvey : {}", userBasicSurvey);

        basicService.insertSurvey(userBasicSurvey);

        return Result.builder().status(ok().body("설문 작성 완료")).build();
    }

    @PostMapping("/modify")
    public Result surveyModify(@RequestBody UserBasicSurvey userBasicSurvey) throws Exception{

        basicRepository.deleteAllByUserId(userBasicSurvey.getUserIdx());
        basicService.insertSurvey(userBasicSurvey);

        return Result.builder().status(ok().body("설문 수정 완료")).build();
    }

}
