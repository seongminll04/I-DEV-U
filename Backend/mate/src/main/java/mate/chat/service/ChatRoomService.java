package mate.chat.service;


import lombok.RequiredArgsConstructor;
import mate.chat.domain.ChatRoom;
import mate.chat.domain.ChatRoomQueryRepository;
import mate.chat.domain.ChatRoomRepository;
import mate.chat.dto.ChatRoomCreateRequest;
import mate.chat.dto.ChatRoomUpdateRequest;
import mate.domain.user.User;
import mate.global.exception.NotFoundException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static mate.global.exception.NotFoundException.CHAT_ROOM_NOT_FOUND;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChatRoomService {
//
//    private final ChatRoomRepository chatRoomRepository;
////    private final ChatRoomQueryRepository chatRoomQueryRepository;
//
//    @Transactional
//    public void createChatRoom(ChatRoomCreateRequest request, User user) {
//
//        ChatRoom chatRoom = ChatRoom.createChatRoom(request.getTitle(), user);
//        chatRoomRepository.save(chatRoom);
//    }
//
//    @Transactional
//    public void updateChatRoom(Long roomId, ChatRoomUpdateRequest request, User user) {
//
//        ChatRoom findChatRoom = chatRoomRepository.findWithChatRoomUsersById(roomId)
//                .orElseThrow(() -> new NotFoundException(CHAT_ROOM_NOT_FOUND));
//
//        if (!findChatRoom.isMaster(user)) {
//            throw new AccessDeniedException("");
//        }
//
//        findChatRoom.update(request.getTitle());
//    }
//
//    @Transactional
//    public void deleteChatRoom(Long roomId, User user) {
//        ChatRoom findChatRoom = chatRoomRepository.findWithChatRoomUsersById(roomId)
//                .orElseThrow(() -> new NotFoundException(CHAT_ROOM_NOT_FOUND));
//
//        if (!findChatRoom.isMaster(user)) {
//            throw new AccessDeniedException("");
//        }
//
//    }
//
//
//    @Transactional
//    public void createChatRoomUser(Long roomId, User user) {
//
//        ChatRoom findChatRoom = chatRoomRepository.findWithChatRoomUsersById(roomId)
//                .orElseThrow(() -> new NotFoundException(CHAT_ROOM_NOT_FOUND));
//
//        findChatRoom.addChatRoomUser(user);
//    }
//
//    @Transactional
//    public void deleteChatRoomUser(Long roomId, User user) {
//
//        ChatRoom findChatRoom = chatRoomRepository.findWithChatRoomUsersById(roomId)
//                .orElseThrow(() -> new NotFoundException(CHAT_ROOM_NOT_FOUND));
//
//        findChatRoom.deleteChatRoomUser(user);
//    }

//    public List<ChatRoomResponse> findByUser(User user) {
//        List<ChatRoom> findChatRooms = chatRoomQueryRepository.findByUser(user);
//        return findChatRooms.stream()
//                .map(chatRoom -> ChatRoomResponse.of(chatRoom))
//                .collect(Collectors.toList());
//    }
}
