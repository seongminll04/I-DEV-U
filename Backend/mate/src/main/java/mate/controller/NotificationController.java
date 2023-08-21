package mate.controller;

import lombok.RequiredArgsConstructor;
import mate.dto.NotificationDto;
import mate.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/noti")
@CrossOrigin(origins = {})
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/list/all")
    public ResponseEntity<Map<String, Object>> getAllNoti() {
        Map<String, Object> map = new HashMap<>();
        map.put("resmsg", "알림 전체조회 성공");
        map.put("data", notificationService.getNotificationAll());

        return ResponseEntity.ok(map);
    }

    @GetMapping("/list/unchecked/{userIdx}")
    public ResponseEntity<Map<String, Object>> getAllUncheckedNoti(@PathVariable int userIdx) {
        Map<String, Object> map = new HashMap<>();
        map.put("resmsg", "알림 전체조회 성공");
        map.put("data", notificationService.findTop4UncheckedNotification(userIdx));

        return ResponseEntity.ok(map);
    }

    @GetMapping("/list/top/{userIdx}")
    public ResponseEntity<Map<String, Object>> getNotiTop4(@PathVariable int userIdx) {
        Map<String, Object> map = new HashMap<>();
        map.put("resmsg", "알림 4개조회 성공");
        map.put("data", notificationService.findTop4UncheckedNotification(userIdx).stream().map(noti -> {
            NotificationDto dto = new NotificationDto();
            dto.setIdx(noti.getIdx());
            dto.setNickname(noti.getUser().getNickname());
            dto.setContent(noti.getContent());
            dto.setChecked(noti.getChecked());
            dto.setCreatedAt(noti.getCreatedAt());

            return dto;
        }));

        return ResponseEntity.ok(map);
    }
}
