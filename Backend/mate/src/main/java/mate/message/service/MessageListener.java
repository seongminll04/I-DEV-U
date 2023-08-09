package mate.message.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import mate.message.domain.ChatMessage;
import mate.message.dto.MessageResponse;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MessageListener {

//    private final ObjectMapper objectMapper;
    private final SimpMessageSendingOperations messagingTemplate;

    public void sendMessage(ChatMessage receiveMessage) throws JsonProcessingException {
//        ChatMessage message = objectMapper.readValue(receiveMessage, ChatMessage.class);
        messagingTemplate.convertAndSend("/sub/rooms/" + receiveMessage.getRoomIdx(), MessageResponse.from(receiveMessage));
    }
}
