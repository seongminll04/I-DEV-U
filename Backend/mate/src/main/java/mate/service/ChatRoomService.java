package mate.service;

import lombok.RequiredArgsConstructor;
import mate.domain.chat.ChatRoom;
import mate.repository.ChatRoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;

    public void writeChatRoom(ChatRoom chatRoom) {
        chatRoomRepository.save(chatRoom);
    }

    public void modifyChatRoom(ChatRoom chatRoom) {
        chatRoomRepository.save(chatRoom);
    }

    public void deleteChatRoom(int chatRoomIdx) {
        chatRoomRepository.deleteById(chatRoomIdx);
    }

    public List<ChatRoom> getChatRoomList(){
        return chatRoomRepository.findAll();
    }
}
