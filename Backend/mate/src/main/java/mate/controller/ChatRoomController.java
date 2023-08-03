package mate.controller;

import lombok.RequiredArgsConstructor;
import mate.service.ChatRoomService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/chatRoom")
@CrossOrigin(origins = {})
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> getChatRoomList(){
        System.out.println("chatroom list all");
        Map<String, Object> map = new HashMap<>();

        map.put("list", chatRoomService.getChatRoomList());
        return ResponseEntity.ok(map);
    }
}
