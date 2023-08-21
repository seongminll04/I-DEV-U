package mate.session.controller;


import lombok.RequiredArgsConstructor;
import mate.controller.Result;
import mate.session.domain.SessionRepository;
import mate.session.dto.SessionResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

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

    @GetMapping("/list")
    public Result userList(){
        List<SessionResponse> sessionResponse = sessionRepository.userList()
                .orElse(Collections.emptyList())
                .stream()
                .map(session -> {
                    SessionResponse response = SessionResponse.from(session);
                    return response;
                })
                .collect(Collectors.toList());
        return Result.builder().data(sessionResponse).status(ResponseEntity.ok("접속한 유저 리스트")).build();
    }

}
