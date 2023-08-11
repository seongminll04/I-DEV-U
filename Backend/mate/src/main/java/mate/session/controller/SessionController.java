package mate.session.controller;


import lombok.RequiredArgsConstructor;
import mate.controller.Result;
import mate.session.domain.SessionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/session")
public class SessionController {

    private final SessionRepository sessionRepository;

    @DeleteMapping("/logout/{userIdx}")
    public Result deleteSession(@PathVariable("userIdx") Integer userIdx){
        sessionRepository.deleteByIdx(userIdx);
        return Result.builder().status(ResponseEntity.ok(userIdx + "번 유저 연결 삭제 성공")).build();
    }

}
