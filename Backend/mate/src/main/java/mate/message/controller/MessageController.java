package mate.message.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import mate.controller.Result;
import mate.message.dto.MessageCreateRequest;
import mate.message.dto.MessageResponse;
import mate.message.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    /**
     * 해당방의 채팅내역 조회 (페이징)
     */
    @GetMapping("/chat/rooms/{roomIdx}/messages")
    public Result findByRoomId(@PathVariable("roomIdx") Integer roomIdx) {
        List<MessageResponse> response = messageService.searchMessage(roomIdx);
        return Result.builder().data(response).status(ResponseEntity.ok("채팅 내역")).build();
    }
    /**
     * 마지막 메세지
     */

    @GetMapping("/chat/rooms/{roomIdx}/last")
    public Result findByLast(@PathVariable("roomIdx") Integer roomIdx){
        return messageService.lastMessage(roomIdx);
    }

    /**
     * 메세지 전송
     */
    @MessageMapping("/messages")
    public void createMessage(MessageCreateRequest request) throws JsonProcessingException {
        messageService.createMessage(request);
    }

}
