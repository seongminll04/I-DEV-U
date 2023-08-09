package mate.chat.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mate.chat.domain.ChatRoom;
import mate.chat.domain.ChatRoomRepository;
import mate.chat.dto.ChatRoomCreateRequest;
import mate.chat.dto.ChatRoomResponse;
import mate.chat.dto.ChatRoomUpdateRequest;
import mate.chat.dto.ChatRoomUserRequest;
import mate.controller.Result;
import mate.domain.user.User;
import mate.global.exception.NotFoundException;
import mate.message.domain.MessageRepository;
import mate.message.service.MessageService;
import mate.repository.user.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static mate.global.exception.NotFoundException.CHAT_ROOM_NOT_FOUND;
import static mate.global.exception.NotFoundException.USER_NOT_FOUND;
import static org.springframework.http.ResponseEntity.*;


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

    public Result createRoom(ChatRoomCreateRequest chatRoomCreateRequest){

        User user = userRepository.findByIdx(chatRoomCreateRequest.getUserIdx()).orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        ChatRoom chatRoom = ChatRoom.createChatRoom(chatRoomCreateRequest.getTitle(), user);

        chatRoomRepository.save(chatRoom);

        return Result.builder().status(ok().body("방 생성 완료")).build();
    }

    public Result deleteChatRoom(Integer roomIdx, Integer userIdx){

        ChatRoom findChatRoom = chatRoomRepository.findWithChatRoomUsersByIdx(roomIdx)
                .orElseThrow(() -> new NotFoundException(CHAT_ROOM_NOT_FOUND));

        if (!findChatRoom.isMaster(userIdx)) throw new AccessDeniedException("방장이 아닙니다.");

        chatRoomRepository.delete(findChatRoom);
        return Result.builder().status(ResponseEntity.ok(roomIdx + " 번 채팅방 삭제")).build();
    }

    public Result updateChatRoom(Integer roomIdx, ChatRoomUpdateRequest chatRoomUpdateRequest){

        ChatRoom findChatRoom = chatRoomRepository.findWithChatRoomUsersByIdx(roomIdx)
                .orElseThrow(() -> new NotFoundException(CHAT_ROOM_NOT_FOUND));


        if (!findChatRoom.isMaster(chatRoomUpdateRequest.getUserIdx())) throw new AccessDeniedException("방장이 아닙니디.");

        findChatRoom.update(chatRoomUpdateRequest.getTitle());

        return Result.builder().status(ResponseEntity.ok("채팅방 수정 성공")).build();

    }

    public Result createChatRoomUser(Integer roomIdx, ChatRoomUserRequest chatRoomUserRequest){

        ChatRoom findChatRoom = chatRoomRepository.findWithChatRoomUsersByIdx(roomIdx)
                .orElseThrow(() -> new NotFoundException(CHAT_ROOM_NOT_FOUND));

        User user = userRepository.findByIdx(chatRoomUserRequest.getUserIdx())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        findChatRoom.addChatRoomUser(user);
        return Result.builder().status(ResponseEntity.ok(roomIdx + " 번 방 " + user.getNickname() + " 입장")).build();
    }

    public Result deleteChatRoomUser(Integer roomIdx, Integer userIdx) {

        ChatRoom findChatRoom = chatRoomRepository.findWithChatRoomUsersByIdx(roomIdx)
                .orElseThrow(() -> new NotFoundException(CHAT_ROOM_NOT_FOUND));

        User user = userRepository.findByIdx(userIdx)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        findChatRoom.deleteChatRoomUser(user);

        return Result.builder().status(ResponseEntity.ok(roomIdx + "번 방 " + user.getNickname() + " 퇴장")).build();
    }
}
