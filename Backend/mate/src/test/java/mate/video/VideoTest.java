package mate.video;

import lombok.extern.slf4j.Slf4j;
import mate.domain.user.User;
import mate.domain.video.VideoRoom;
import mate.dto.video.VideoCreateRequest;
//import mate.repository.UserRepository;
//import mate.service.UserService;
import mate.service.video.VideoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;

@Slf4j
@SpringBootTest
//@Transactional
public class VideoTest {

//    @Autowired
//    VideoService videoService;
//
//    @Autowired
//    UserRepository userRepository;
//
//    @Test
//    void 화상채팅_생성() throws IOException {
//        VideoCreateRequest videoCreateRequest = new VideoCreateRequest();
//
//        videoCreateRequest.setTitle("화상채팅2");
//        videoCreateRequest.setUserIdx(5);
//        videoCreateRequest.setOvSession("Session2");
//
//        videoService.createVideo(videoCreateRequest);
//    }
//
//    @Test
//    void 화상채팅_입장() {
//        videoService.enterVideo(videoService.findVideoRoomByIdx(1), 6);
//    }
//
//    @Test
//    void 화상채팅방_리스트조회() {
//        List<VideoRoom> list = videoService.videoRoomList(6);
//        for (VideoRoom room : list) {
//            System.out.println(room.getOvSession());
//        }
//    }

}
