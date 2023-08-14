package mate.chat.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mate.chat.domain.*;
import mate.chat.dto.*;
import mate.controller.Result;
import mate.domain.user.User;
import mate.global.exception.DuplicateException;
import mate.global.exception.NotFoundException;
import mate.message.domain.MessageRepository;
import mate.message.service.MessageService;
import mate.repository.user.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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

        ChatRoom chatRoom = ChatRoom.createChatRoom(chatRoomCreateRequest, user);

        chatRoomRepository.save(chatRoom);
        ChatRoomIdxResponse roomIdx = ChatRoomIdxResponse.from(chatRoom.getIdx());

        return Result.builder().data(roomIdx).status(ok().body("방 생성 완료")).build();
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

        findChatRoom.update(chatRoomUpdateRequest);

        return Result.builder().status(ResponseEntity.ok("채팅방 수정 성공")).build();

    }

    public Result createChatRoomUser(Integer roomIdx, ChatRoomUserRequest chatRoomUserRequest){

        ChatRoom findChatRoom = chatRoomRepository.findWithChatRoomUsersByIdx(roomIdx)
                .orElseThrow(() -> new NotFoundException(CHAT_ROOM_NOT_FOUND));

        findChatRoom.updateTime(chatRoomUserRequest.getUpdatedAt());

        User user = userRepository.findByIdx(chatRoomUserRequest.getUserIdx())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        findChatRoom.addChatRoomUser(user, chatRoomUserRequest.getUpdatedAt());
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

    public Result findAll() {
        List<ChatRoomListResponse> chatRoomList = chatRoomRepository.findAll().stream()
                .map(chatRoom -> ChatRoomListResponse.from(chatRoom))
                .collect(Collectors.toList());

        if (chatRoomList.isEmpty()) return Result.builder().data(chatRoomList).status(ResponseEntity.ok("채팅방 없음")).build();
        return Result.builder().data(chatRoomList).status(ResponseEntity.ok("채팅방")).build();
    }


    public Result findMaster(Integer roomIdx) {

        ChatRoom findChatRoom = chatRoomRepository.findWithChatRoomUsersByIdx(roomIdx)
                .orElseThrow(() -> new NotFoundException(CHAT_ROOM_NOT_FOUND));

        Optional<ChatParticipation> masterParticipation = findChatRoom.getChatRoomUsers().stream()
                .filter(user -> user.getRole() == Role.MASTER).findFirst();

        ChatRoomMasterResponse response = masterParticipation.map(chatRoomUser -> {
            return ChatRoomMasterResponse.from(roomIdx, chatRoomUser.getUser().getIdx());
        }).orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        return Result.builder().data(response).status("방장 idx").build();
    }

    public Result checkChatRoomUser(Integer roomIdx, Integer userIdx) {

        ChatRoom findChatRoom = chatRoomRepository.findWithChatRoomUsersByIdx(roomIdx)
                .orElseThrow(() -> new NotFoundException(CHAT_ROOM_NOT_FOUND));

        List<ChatParticipation> result = findChatRoom.getChatRoomUsers().stream()
                .filter(chatRoomUser -> chatRoomUser.getUser().getIdx().equals(userIdx))
                .collect(Collectors.toList());
        mate.alarm.dto.ChatRoomResponse response = mate.alarm.dto.ChatRoomResponse.from(findChatRoom);

        if (result.size() > 0) {
            return Result.builder().data(response).status(ResponseEntity.ok("이미 참가한 방입니다.")).build();
        }
        return Result.builder().data(response).status(ResponseEntity.ok("방 만들어야 함")).build();
    }

    public Result checkChatRoom(Integer fromIdx, Integer toIdx) {


        List<ChatRoom> chatRooms = chatRoomRepository.findTwo();
        if (chatRooms.size() > 0){
            for (ChatRoom chatRoom : chatRooms) {
                List<ChatParticipation> chatRoomUsers = chatRoom.getChatRoomUsers();
                if ((chatRoomUsers.get(0).getIdx() == fromIdx && chatRoomUsers.get(1).getIdx() == toIdx)
                    || (chatRoomUsers.get(0).getIdx() == toIdx && chatRoomUsers.get(1).getIdx() == fromIdx)){
                    ChatRoom findChatRoom = chatRoomRepository.findWithChatRoomUsersByIdx(chatRoom.getIdx())
                            .orElseThrow(() -> new NotFoundException(CHAT_ROOM_NOT_FOUND));
                    mate.alarm.dto.ChatRoomResponse response = mate.alarm.dto.ChatRoomResponse.from(findChatRoom);
                    return Result.builder().data(response).status(ResponseEntity.ok("채팅방 이미 있음")).build();
                }
            }
        }
        return Result.builder().status(ResponseEntity.ok("채팅방 없음")).build();
    }
}
