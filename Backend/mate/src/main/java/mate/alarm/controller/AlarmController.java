package mate.alarm.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import mate.alarm.dto.*;
import mate.alarm.service.AlarmService;
import mate.controller.Result;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class AlarmController {

    private final AlarmService alarmService;

    @MessageMapping("/user")
    public void createAlarm(AlarmRequest request){
        alarmService.createAlarm(request);
    }
    // 알람 테스트
    @PostMapping("/test/user")
    public Result createAlarmv2(@RequestBody AlarmRequest request){
        return alarmService.createAlarmv2(request);
    }
    //
    /*
        채팅방 참가 신청 요청
     */
    @MessageMapping("request/chat")
    public void createChatAlarm(AlarmChatRequest request){
        alarmService.createChatAlarm(request);
    }

    /*
        채팅방 참가 신청 요청 테스트
     */
    @PostMapping("/test/request/chat")
    public Result createChatAlarmTest(@RequestBody AlarmChatRequest request){
        return alarmService.createChatAlarmv2(request);
    }

    /*
    프로젝트 참가 신청 요청
 */
    @MessageMapping("/request/project")
    public void createProjectAlarm(AlarmProjectRequest request){
        alarmService.createProjectAlarm(request);
    }


    /*
    프로젝트 참가 신청 요청 테스트
 */
    @PostMapping("/test/request/project")
    public Result createProjectAlarmTest(@RequestBody AlarmProjectRequest request){
        return alarmService.createProjectAlarmv2(request);
    }


    /*
        채팅방 초대 신청 요청
     */
    @MessageMapping("/invite/chat")
    public void createChatInviteAlarm(AlarmChatInviteRequest request){
        alarmService.createChatInviteAlarm(request);
    }
    /*
        채팅방 초대 신청 요청 테스트
     */
    @PostMapping("/test/invite/chat")
    public Result createChatInviteAlarmTest(@RequestBody AlarmChatInviteRequest request){
        return alarmService.createChatInviteAlarmv2(request);
    }
    /*
        프로젝트 초대 신청 요청
    */
    @MessageMapping("invite/project")
    public void createProjectInviteAlarm(AlarmProjectInviteRequest request){
        alarmService.createProjectInviteAlarm(request);
    }

    /*
        프로젝트 초대 신청 요청 테스트
    */
    @PostMapping("/test/invite/project")
    public Result createProjectInviteAlarmTest(@RequestBody AlarmProjectInviteRequest request){
        return alarmService.createProjectInviteAlarmv2(request);
    }



    // 알림 리스트 조회 (내가 받은 알람)
    @GetMapping("/alarm/from/{userIdx}")
    public Result fromAlarm(@PathVariable("userIdx") Integer userIdx){
        return alarmService.findByFrom(userIdx);
    }

    // 알림 리스트 조회 (내가 보냄 알람)
    @GetMapping("/alarm/to/{userIdx}")
    public Result toAlarm(@PathVariable("userIdx") Integer userIdx){
        return alarmService.findByTo(userIdx);
    }

    //알림 삭제
    @DeleteMapping("/alarm/{idx}")
    public Result deleteAlarm(@PathVariable("idx") Integer idx){
        return alarmService.deleteByIdx(idx);
    }



}
