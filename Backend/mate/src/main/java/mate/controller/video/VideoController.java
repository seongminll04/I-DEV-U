package mate.controller.video;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import mate.domain.video.VideoRoom;
import mate.dto.video.VideoCreateRequest;
import mate.dto.video.VideoDto;
import mate.service.video.VideoService;

@RestController
@RequestMapping("/video")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class VideoController {

	private final VideoService videoService;

	@PostMapping("/create")
	public ResponseEntity<Map<String, String>> createVideo(@RequestBody VideoCreateRequest videoCreateRequest) {
		Map<String, String> map = new HashMap<>();

		try {
			videoService.createVideo(videoCreateRequest);
			map.put("resmsg", "화생채팅방 생성 성공");
			return ResponseEntity.ok(map);
		} catch (IOException e) {
			map.put("resmsg", "화생채팅방 생성 실패");
			return ResponseEntity.ok(map);
		}
	}

	@GetMapping("/list/{userIdx}")
	public ResponseEntity<Map<String, Object>> videoRoomList(@PathVariable("userIdx") int userIdx) {
		Map<String, Object> map = new HashMap<>();

		List<VideoRoom> list = videoService.videoRoomList(userIdx);
		List<VideoDto> dto = new ArrayList<>();

		for (VideoRoom room : list) {
			dto.add(new VideoDto(room.getIdx(), room.getTitle(),
				room.getTotalNumber(), 1, room.getOvSession(), (room.getUser().getIdx() == userIdx)));
		}

		map.put("list", dto);

		return ResponseEntity.ok(map);
	}

	// 생성되어 있는 화상채팅방에 처음 입장
	@PostMapping("/enter")
	public ResponseEntity<Map<String, Object>> enterVideo(@RequestBody Map<String, Integer> input) {
		String ovSession = videoService.enterVideo(input.get("roomIdx"), input.get("userIdx"));

		Map<String, Object> map = new HashMap<>();

		map.put("ovSession", ovSession);

		return ResponseEntity.ok(map);
	}

	// 화상채팅방 영원히 퇴장
	@DeleteMapping("/leave")
	public ResponseEntity<Map<String, String>> leaveVideo(@RequestBody Map<String, Integer> input) {
		Map<String, String> map = new HashMap<>();

		//		try {
		videoService.leaveVideo(input.get("roomIdx"), input.get("userIdx"));
		map.put("resmsg", "화상채팅방 나가기 성공");
		//		} catch (Exception e) {
		//			map.put("resmsg", "화상채팅방 나가기 실패");
		//		}

		return ResponseEntity.ok(map);
	}
}
