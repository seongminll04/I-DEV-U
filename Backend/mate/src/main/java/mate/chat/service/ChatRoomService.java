package mate.chat.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mate.chat.domain.ChatRoom;
import mate.chat.domain.ChatRoomRepository;
import mate.chat.dto.ChatRoomResponse;
import mate.domain.user.User;
import mate.global.exception.NotFoundException;
import mate.repository.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static mate.global.exception.NotFoundException.USER_NOT_FOUND;


@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;

    public List<ChatRoomResponse> findByUser(Integer userIdx) {
        User user = userRepository.findByIdx(userIdx).orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        List<ChatRoom> findChatRooms = chatRoomRepository.findWithUser(user);
        return findChatRooms.stream()
                .map(chatRoom -> ChatRoomResponse.of(chatRoom))
                .collect(Collectors.toList());
    }
}
