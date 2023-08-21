package mate.alarm.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import mate.alarm.domain.Alarm;
import mate.alarm.dto.AlarmChatResponse;
import mate.alarm.dto.AlarmProjectResponse;
import mate.alarm.dto.AlarmResponse;
import mate.chat.domain.ChatRoom;
import mate.domain.project.Project;
import mate.domain.user.User;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AlarmListener {

    private final SimpMessageSendingOperations messagingTemplate;


    public void sendAlarm(AlarmResponse response){
        messagingTemplate.convertAndSend("/sub/user/" + response.getToUser().getIdx(), response);
    }

    public void sendChat(AlarmChatResponse response){
        messagingTemplate.convertAndSend("/sub/request/chat/"
                + response.getAlarmResponse().getToUser().getIdx(), response);
    }


    public void sendProject(AlarmProjectResponse response){
        messagingTemplate.convertAndSend("/sub/request/project/" + response.getAlarmResponse().getToUser().getIdx(), response);
    }


    public void sendChatInvite(AlarmChatResponse response){
        messagingTemplate.convertAndSend("/sub/invite/chat/" + response.getAlarmResponse().getToUser().getIdx(), response);
    }

    public void sendProjectInvite(AlarmProjectResponse response) {
        messagingTemplate.convertAndSend("/sub/invite/project/" + response.getAlarmResponse().getToUser().getIdx(), response);
    }

}
