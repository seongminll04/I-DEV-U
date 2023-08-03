package mate.service.video;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mate.domain.user.User;
import mate.domain.video.VideoRoom;
import mate.dto.video.VideoCreateRequest;
import mate.repository.user.UserRepository;
import mate.repository.video.VideoParticipationRepository;
import mate.repository.video.VideoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class VideoService {
	private final VideoRepository videoRepository;
	private final VideoParticipationRepository videoParticipationRepository;
	private final UserRepository userRepository;

	// 화상채팅방 생성
	public String createVideo(VideoCreateRequest videoCreateRequest) {
		String videoCode = makeRoomCode();

		Optional<User> user = userRepository.findByEmail(videoCreateRequest.getEmail());

		videoRepository.save(VideoRoom.builder()
			.user(user.get())
			.title(videoCreateRequest.getTitle())
			.content(videoCreateRequest.getContent())
			.type(videoCreateRequest.getType())
			.createdAt(LocalDateTime.now())
			.videoCode(videoCode).build());

		return videoCode;
	}

	// 이미 생성되어 있는 화상채팅방에 들어감
	// public VideoRoom enterVideo(String videoCode) {
	//
	// 	// 해당 방 인원 추가
	//
	// 	// VideoParticipation 추가
	//
	// }

	// 내가 접속해있는 화상채팅방 목록 조회
	// public List<VideoRoom> videoRoomList(String email) {
	// 	// 일단 email을 가진 유저가 접속해있는 방 번호 리턴
	// 	List<VideoParticipation> list = videoParticipationRepository
	// }

	public String makeRoomCode() {
		int leftLimit = 48; // numeral '0'
		int rightLimit = 122; // letter 'z'
		int targetStringLength = 10;
		Random random = new Random();

		String generatedString = random.ints(leftLimit, rightLimit + 1)
			.filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
			.limit(targetStringLength)
			.collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
			.toString();
		return generatedString;
	}
}
