package mate.service.video;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.util.Optional;

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
import mate.repository.UserRepository;
import mate.repository.video.VideoParticipationRepository;
import mate.repository.video.VideoRepository;

@Slf4j
@Service
@RequiredArgsConstructor
public class VideoService {
	private final VideoRepository videoRepository;
	private final VideoParticipationRepository videoParticipationRepository;
	private final UserRepository userRepository;

	// 화상채팅방 생성
	public String createVideo(VideoCreateRequest videoCreateRequest) throws IOException {
		String userToken = generateToken("", "");

		Optional<User> user = userRepository.findByEmail(videoCreateRequest.getEmail());

		videoRepository.save(VideoRoom.builder()
			.user(user.get())
			.title(videoCreateRequest.getTitle())
			.content(videoCreateRequest.getContent())
			.type(videoCreateRequest.getType())
			.createdAt(LocalDateTime.now())
			.videoCode(videoCreateRequest.getSessionId()).build());

		return userToken;
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

	public static String generateToken(String sessionId, String role) throws
		IOException {
		String openViduUrl = "https://i9b206.p.ssafy.io:8445";
		String openViduSecret = "PWB206206";
		role = "publisher"; // or "subscriber" depending on the user's role

		String url = openViduUrl + "/api/sessions/" + sessionId + "/connection";

		HttpClient httpClient = HttpClientBuilder.create().build();
		HttpPost httpPost = new HttpPost(url);
		httpPost.setHeader("Authorization",
			"Basic " + java.util.Base64.getEncoder().encodeToString(("OPENVIDUAPP:" + openViduSecret).getBytes()));
		httpPost.setHeader("Content-Type", "application/json");

		JSONObject requestBody = new JSONObject();
		requestBody.put("role", role);

		StringEntity params = new StringEntity(requestBody.toString());
		httpPost.setEntity(params);

		HttpResponse response = httpClient.execute(httpPost);

		if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
			BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
			StringBuilder result = new StringBuilder();
			String line;
			while ((line = reader.readLine()) != null) {
				result.append(line);
			}

			JSONObject jsonResponse = new JSONObject(result.toString());
			return jsonResponse.getString("token");
		} else {
			throw new IOException("Failed to generate user token");
		}
	}
}
