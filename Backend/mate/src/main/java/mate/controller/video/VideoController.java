package mate.controller.video;

import lombok.RequiredArgsConstructor;
import mate.controller.Result;
import mate.domain.video.VideoRoom;
import mate.dto.video.VideoCreateRequest;
import mate.dto.video.VideoDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.openvidu.java.client.OpenVidu;
import mate.service.UserService;
import mate.service.video.VideoService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.springframework.http.ResponseEntity.badRequest;
import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/video")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class VideoController {

	private final VideoService videoService;

	@PostMapping("/create")
	public Result createVideo(@RequestBody VideoCreateRequest videoCreateRequest) {
		try {
			videoService.createVideo(videoCreateRequest);
			return Result.builder().status(ok().body("화상채팅방 생성 성공")).build();
		} catch (IOException e) {
			return Result.builder().status(badRequest().body("화상채팅방 생성 실패")).build();
		}
	}

	@GetMapping("/list/{userIdx}")
	public Result<Object> videoRoomList(@PathVariable("userIdx") int userIdx) {
		List<VideoRoom> list = videoService.videoRoomList(userIdx);
		List<VideoDto> dto = new ArrayList<>();

		for(VideoRoom room : list) {
			dto.add(new VideoDto(room.getIdx(), room.getTitle(),
					room.getTotalNumber(), 1, room.getOvSession(), (room.getUser().getIdx() == userIdx)));
		}

		return Result.builder().status(ok().body(dto)).build();
	}
}
