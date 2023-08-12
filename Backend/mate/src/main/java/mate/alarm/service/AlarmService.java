package mate.alarm.service;

import lombok.RequiredArgsConstructor;
import mate.alarm.domain.Alarm;
import mate.alarm.domain.AlarmRepository;
import mate.alarm.dto.AlarmChatRequest;
import mate.alarm.dto.AlarmProjectRequest;
import mate.alarm.dto.AlarmRequest;
import mate.alarm.dto.AlarmResponse;
import mate.chat.domain.ChatParticipation;
import mate.chat.domain.ChatRoom;
import mate.chat.domain.ChatRoomRepository;
import mate.chat.domain.Role;
import mate.chat.dto.ChatRoomMasterResponse;
import mate.controller.Result;
import mate.domain.project.Project;
import mate.domain.user.User;
import mate.global.exception.NotFoundException;
import mate.repository.project.ProjectRepository;
import mate.repository.user.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static mate.global.exception.NotFoundException.CHAT_ROOM_NOT_FOUND;
import static mate.global.exception.NotFoundException.USER_NOT_FOUND;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AlarmService {

    private final UserRepository userRepository;
    private final AlarmRepository alarmRepository;
    private final AlarmListener alarmListener;
    private final ProjectRepository projectRepository;
    private final ChatRoomRepository chatRoomRepository;

    @Transactional
    public void createAlarm(AlarmRequest request) {

        User fromUser = userRepository.findByIdx(request.getFromIdx())
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));

        User toUser = userRepository.findByIdx(request.getToIdx())
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));

        Alarm alarm = Alarm.createAlarm(request);
        alarmRepository.saveAndFlush(alarm);
        alarmListener.sendAlarm(fromUser, toUser, alarm);
    }
    @Transactional
    public Result createAlarmv2(AlarmRequest request) {

        User fromUser = userRepository.findByIdx(request.getFromIdx())
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));

        User toUser = userRepository.findByIdx(request.getToIdx())
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));

        Alarm alarm = Alarm.createAlarm(request);
        alarmRepository.saveAndFlush(alarm);

        AlarmResponse from = AlarmResponse.from(fromUser, toUser, alarm);
        return Result.builder().data(from).status(ResponseEntity.ok("알람 응답")).build();
    }

    public Result findByFrom(Integer userIdx) {
        Optional<List<Alarm>> findAlarm = alarmRepository.findFrom(userIdx);

        if (findAlarm.isEmpty()){
            AlarmResponse alarmResponse = new AlarmResponse();
            return Result.builder().data(alarmResponse).status(ResponseEntity.ok("받은 알림 없음")).build();
        }else{
            AlarmResponse alarmResponse = new AlarmResponse();
            return Result.builder().build();
        }
    }

    public Result findByTo(Integer userIdx) {
        Optional<List<Alarm>> findAlarm = alarmRepository.findTo(userIdx);

        if (findAlarm.isEmpty()){
            AlarmResponse alarmResponse = new AlarmResponse();
            return Result.builder().data(alarmResponse).status(ResponseEntity.ok("보낸 알림 없음")).build();
        }else{
            AlarmResponse alarmResponse = new AlarmResponse();
            return Result.builder().build();
        }
    }

    @Transactional
    public Result deleteByIdx(Integer idx) {
        alarmRepository.deleteByIdx(idx);
        return Result.builder().status(ResponseEntity.ok(idx + "번 알림 삭제 성공")).build();
    }

    public void createProjectAlarm(AlarmProjectRequest alarmProjectRequest) {

        User fromUser = userRepository.findByIdx(alarmProjectRequest.getFromIdx())
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));

        Project project = projectRepository.findProject(alarmProjectRequest.getProjectIdx())
                .orElseThrow(() -> new NotFoundException(CHAT_ROOM_NOT_FOUND));

        Alarm alarm = Alarm.create(fromUser.getIdx(), project.getManager().getIdx(),
                alarmProjectRequest.getType(), alarmProjectRequest.getCreatedAt());

        alarmRepository.saveAndFlush(alarm);
        alarmListener.sendProject(fromUser, project, alarm);
    }

    public void createChatAlarm(AlarmChatRequest alarmChatRequest) {

        User fromUser = userRepository.findByIdx(alarmChatRequest.getFromIdx())
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));


        ChatRoom findChatRoom = chatRoomRepository.findWithChatRoomUsersByIdx(alarmChatRequest.getChatRoomIdx())
                .orElseThrow(() -> new NotFoundException(CHAT_ROOM_NOT_FOUND));

        Optional<ChatParticipation> masterParticipation = findChatRoom.getChatRoomUsers().stream()
                .filter(user -> user.getRole() == Role.MASTER).findFirst();

        ChatRoomMasterResponse response = masterParticipation.map(chatRoomUser -> {
            return ChatRoomMasterResponse.from(alarmChatRequest.getChatRoomIdx(), chatRoomUser.getUser().getIdx());
        }).orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        Alarm alarm = Alarm.create(fromUser.getIdx(), response.getMasterIdx(),
                alarmChatRequest.getType(), alarmChatRequest.getCreatedAt());

        alarmRepository.saveAndFlush(alarm);
        alarmListener.sendChat(fromUser, response, alarm);

    }
}
