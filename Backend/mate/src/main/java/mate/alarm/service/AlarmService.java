package mate.alarm.service;

import lombok.RequiredArgsConstructor;
import mate.alarm.domain.Alarm;
import mate.alarm.domain.AlarmRepository;
import mate.alarm.dto.AlarmRequest;
import mate.alarm.dto.AlarmResponse;
import mate.controller.Result;
import mate.domain.user.User;
import mate.global.exception.NotFoundException;
import mate.repository.user.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AlarmService {

    private final UserRepository userRepository;
    private final AlarmRepository alarmRepository;
    private final AlarmListener alarmListener;

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
}
