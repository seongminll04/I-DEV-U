package mate.service.video;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import mate.domain.video.VideoParticipation;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

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
	public void createVideo(VideoCreateRequest videoCreateRequest) throws IOException {

		System.out.println(videoCreateRequest);

		User user = userRepository.findById(videoCreateRequest.getUserIdx()).get();

		VideoRoom videoRoom = videoRepository.save(VideoRoom.builder()
			.user(user)
			.title(videoCreateRequest.getTitle())
			.content(videoCreateRequest.getContent())
			.type(videoCreateRequest.getType())
			.createdAt(LocalDateTime.now())
			.ovSession(videoCreateRequest.getOvSession()).build());

		videoParticipationRepository.save(VideoParticipation.builder()
				.videoRoom(videoRoom)
				.user(user).build());
	}

	public VideoRoom findVideoRoomByIdx(int idx) {
		return videoRepository.findVideoRoomByIdx(idx);
	}

	public String enterVideo(int roomIdx, int userIdx) {
		VideoRoom videoRoom = videoRepository.findVideoRoomByIdx(roomIdx);

		videoParticipationRepository.save(VideoParticipation.builder()
				.videoRoom(videoRoom)
				.user(userRepository.findById(userIdx).get())
				.build());

		return videoRoom.getOvSession();
	}

	// 내가 접속해있는 화상채팅방 목록 조회
	 public List<VideoRoom> videoRoomList(int userIdx) {
	 	// userIdx와 일치하는 유저가 접속해있는 방 번호 리턴
		 return videoParticipationRepository.findRoomIdxByUserIdx(userIdx);
	 }

	 // 화살채팅방 영원히 나가기
	public void leaveVideo(int roomIdx, int userIdx) {
		videoParticipationRepository.deleteByUserIdxAndRoomIdx(roomIdx, userIdx);
	}
}
