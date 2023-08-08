package mate.message.service;

import lombok.RequiredArgsConstructor;
import mate.message.domain.ChatMessage;
import mate.message.domain.MessageRepository;
import mate.message.dto.MessageCreateRequest;
import mate.message.dto.MessageResponse;
import mate.message.dto.MessageSearchRequest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
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
//    private final MessageRepository messageRepository;
//    private final MessageQueryRepository messageQueryRepository;

    /**
     * 메세지 생성
     */
//    @Transactional
//    public void createMessage(MessageCreateRequest request) {
//        ChatMessage message = ChatMessage.createMessage(request.getRoomIdx(), request.getUserIdx(), request.getName(), request.getMessage());
//        messageRepository.save(message);
////        redisTemplate.convertAndSend(channelTopic.getTopic(), MessageResponse.from(message));
//    }


//    public List<MessageResponse> searchMessage(Long roomId, MessageSearchRequest request) {
//        List<ChatMessage> findMessages = messageQueryRepository.findByCondition(roomId, request);
//        return findMessages.stream()
//                .map(message -> MessageResponse.from(message))
//                .collect(Collectors.toList());
//    }
}
