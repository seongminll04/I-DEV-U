package mate.alarm.service;

import lombok.RequiredArgsConstructor;
import mate.alarm.domain.Alarm;
import mate.alarm.domain.AlarmRepository;
import mate.alarm.dto.AlarmRequest;
import mate.domain.user.User;
import mate.global.exception.NotFoundException;
import mate.repository.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        alarmRepository.save(alarm);
        alarmListener.sendAlarm(fromUser, toUser, alarm);
    }
}
