package mate.message.controller;

import lombok.RequiredArgsConstructor;
import mate.message.dto.MessageCreateRequest;
import mate.message.dto.MessageResponse;
import mate.message.dto.MessageSearchRequest;
import mate.message.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    /**
     * 해당방의 채팅내역 조회 (페이징)
     */
//    @GetMapping("/api/rooms/{roomId}/messages")
//    public ResponseEntity<List<MessageResponse>> findByRoomId(@PathVariable("roomId") Long roomId,
//                                                              @Valid MessageSearchRequest request) {
//        List<MessageResponse> response = messageService.searchMessage(roomId, request);
//        return ResponseEntity.ok(response);
//    }
//
//    /**
//     * 메세지 전송
//     */
//    @MessageMapping("/messages")
//    public void createMessage(MessageCreateRequest request) {
//        messageService.createMessage(request);
//    }

}
