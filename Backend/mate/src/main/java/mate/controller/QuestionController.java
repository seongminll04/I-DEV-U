package mate.controller;

import lombok.RequiredArgsConstructor;
import mate.domain.question.QuestionBoard;
import mate.service.QuestionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/question")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @PostMapping("/write")
    public ResponseEntity<Map<String, Object>> writeNotice(QuestionBoard question) {
        Map<String, Object> map = new HashMap<>();

        questionService.writeQuestion(question);

        return ResponseEntity.ok(map);
    }

    @GetMapping("/detail/{questionIdx}")
    public ResponseEntity<Map<String, Object>> detailQuestion(@PathVariable("questionIdx") int questionIdx) {
        Map<String, Object> map = new HashMap<>();

        QuestionBoard question = questionService.detailQuestion(questionIdx);

        map.put("notification", question);

        return ResponseEntity.ok(map);
    }

    @PutMapping("/modify")
    public ResponseEntity<Map<String, Object>> modifyQuestion(QuestionBoard question) {
        Map<String, Object> map = new HashMap<>();

        questionService.modifyQuestion(question);

        return ResponseEntity.ok(map);
    }

    @DeleteMapping("/delete/{questionIdx}")
    public ResponseEntity<Map<String, Object>> deleteQuestion(@PathVariable("questionIdx") int questionIdx) {
        Map<String, Object> map = new HashMap<>();

        questionService.deleteQuestion(questionIdx);

        return ResponseEntity.ok(map);
    }

    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> getQuestionList() {
        System.out.println("questionAll");
        Map<String, Object> map = new HashMap<>();

        map.put("list", questionService.getQuestionList());
        return ResponseEntity.ok(map);
    }

    @GetMapping("/list/{page}")
    public ResponseEntity<Map<String, Object>> getQuestionTop(@PathVariable("page") int page) {
        System.out.println("questionPage");
        Map<String, Object> map = new HashMap<>();
        map.put("list", questionService.getQuestionList().subList(10 * (page - 1), 10 * page));
        return ResponseEntity.ok(map);
    }

    @GetMapping("/find/title/{keyWord}")
    public ResponseEntity<Map<String, Object>> findQuestionByTitle(
            @PathVariable(value = "keyWord", required = false) String keyWord) {
        System.out.println("title = " + keyWord);
        Map<String, Object> map = new HashMap<>();

        map.put("list", questionService.findQuestionByTitle(keyWord));
        return ResponseEntity.ok(map);
    }

    @GetMapping("/find/content/{keyWord}")
    public ResponseEntity<Map<String, Object>> findQuestionByContent(
            @PathVariable(value = "keyWord", required = false) String keyWord) {
        System.out.println("content = " + keyWord);
        Map<String, Object> map = new HashMap<>();

        map.put("list", questionService.findQuestionByContent(keyWord));
        return ResponseEntity.ok(map);
    }
}
