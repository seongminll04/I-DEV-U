package mate.alarm.service;


import lombok.RequiredArgsConstructor;
import mate.alarm.domain.Alarm;
import mate.alarm.dto.AlarmChatResponse;
import mate.alarm.dto.AlarmProjectResponse;
import mate.alarm.dto.AlarmResponse;
import mate.chat.dto.ChatRoomMasterResponse;
import mate.domain.project.Project;
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

    public void sendProject(User fromUser, Project project, Alarm alarm){
        messagingTemplate.convertAndSend("/sub/request/project/" + project.getManager().getIdx(), AlarmProjectResponse.from(fromUser, project, alarm));
    }

    public void sendChat(User fromUser, ChatRoomMasterResponse response, Alarm alarm){
        messagingTemplate.convertAndSend("/sub/request/chat/" + response.getMasterIdx(), AlarmChatResponse.from(fromUser, response, alarm));
    }

}
