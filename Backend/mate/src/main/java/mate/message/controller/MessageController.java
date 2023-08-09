package mate.message.controller;

import lombok.RequiredArgsConstructor;
import mate.message.dto.MessageResponse;
import mate.message.service.MessageService;
import org.springframework.http.ResponseEntity;
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
    @GetMapping("/chat/rooms/{roomId}/messages")
    public ResponseEntity<List<MessageResponse>> findByRoomId(@PathVariable("roomId") Integer roomId) {
        List<MessageResponse> response = messageService.searchMessage(roomId);
        return ResponseEntity.ok(response);
    }
//
//    /**
//     * 메세지 전송
//     */
//    @MessageMapping("/messages")
//    public void createMessage(MessageCreateRequest request) {
//        messageService.createMessage(request);
//    }

}
