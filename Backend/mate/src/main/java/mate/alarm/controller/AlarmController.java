package mate.alarm.controller;

import lombok.RequiredArgsConstructor;
import mate.alarm.dto.AlarmRequest;
import mate.alarm.service.AlarmService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AlarmController {

    private final AlarmService alarmService;

    @MessageMapping("/alarms")
    public void createAlarm(AlarmRequest request){
        alarmService.createAlarm(request);
    }



}
