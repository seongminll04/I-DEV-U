package mate.video;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import lombok.extern.slf4j.Slf4j;
import mate.domain.video.VideoType;
import mate.dto.video.VideoCreateRequest;
import mate.repository.video.VideoParticipationRepository;
import mate.repository.video.VideoRepository;
import mate.service.video.VideoService;

@Slf4j
@SpringBootTest
// @Transactional
public class VideoTest {

	@Autowired
	VideoRepository videoRepository;

	@Autowired
	VideoService videoService;

	@Autowired
	VideoParticipationRepository videoParticipationRepository;

	@Test
	void 화상채팅방_생성() {
		VideoCreateRequest videoCreateRequest = new VideoCreateRequest();

		videoCreateRequest.setTitle("화상채팅방1");
		videoCreateRequest.setContent("화상채팅방 내용");
		videoCreateRequest.setEmail("gudtjr@ssafy");
		videoCreateRequest.setType(VideoType.Project);

		videoService.createVideo(videoCreateRequest);
	}
}
