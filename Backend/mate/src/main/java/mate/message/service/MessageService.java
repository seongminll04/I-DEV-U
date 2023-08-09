package mate.message.service;

import lombok.RequiredArgsConstructor;
import mate.message.domain.ChatMessage;
import mate.message.domain.MessageRepository;
import mate.message.dto.MessageResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MessageService {

//    private final ChannelTopic channelTopic;
//    private final RedisTemplate redisTemplate;
    private final MessageRepository messageRepository;

    /**
     * 메세지 생성
     */
//    @Transactional
//    public void createMessage(MessageCreateRequest request) {
//        ChatMessage message = ChatMessage.createMessage(request.getRoomIdx(), request.getUserIdx(), request.getName(), request.getMessage());
//        messageRepository.save(message);
////        redisTemplate.convertAndSend(channelTopic.getTopic(), MessageResponse.from(message));
//    }


    public List<MessageResponse> searchMessage(Integer roomId) {
        List<ChatMessage> findMessages = messageRepository.findByMessage(roomId);
        return findMessages.stream()
                .map(message -> MessageResponse.from(message))
                .collect(Collectors.toList());
    }
}
