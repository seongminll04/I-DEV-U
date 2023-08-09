package mate.chat.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mate.chat.dto.ChatRoomCreateRequest;
import mate.chat.dto.ChatRoomResponse;
import mate.chat.service.ChatRoomService;
import mate.controller.Result;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    @GetMapping("/list/{userIdx}")
    public Result findByUser(@PathVariable("userIdx") Integer userIdx) {

        List<ChatRoomResponse> response = chatRoomService.findByUser(userIdx);

        return Result.builder().data(response).status(ResponseEntity.ok("채팅방 리스트")).build();
    }

    @PostMapping("/rooms")
    public Result createChatRoom(@RequestBody ChatRoomCreateRequest chatRoomCreateRequest){

        return chatRoomService.createRoom(chatRoomCreateRequest);
    }



}
