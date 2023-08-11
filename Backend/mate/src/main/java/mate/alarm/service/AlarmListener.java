package mate.alarm.service;


import lombok.RequiredArgsConstructor;
import mate.alarm.domain.Alarm;
import mate.alarm.dto.AlarmResponse;
import mate.domain.user.User;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AlarmListener {

    private final SimpMessageSendingOperations messagingTemplate;

    public void sendAlarm(User fromUser, User toUser, Alarm alarm){
        messagingTemplate.convertAndSend("/sub/alarms/" + toUser.getIdx(), AlarmResponse.from(fromUser, toUser, alarm));
    }

}
