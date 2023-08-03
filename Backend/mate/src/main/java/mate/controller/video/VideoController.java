package mate.controller.video;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.openvidu.java.client.OpenVidu;
import mate.service.user.UserService;
import mate.service.video.VideoService;

@RestController
@RequestMapping("/video")
@CrossOrigin(origins = {})
public class VideoController {

	// @Value("${OPENVIDU.URL}")
	// private String OPENVIDU_URL;
	//
	// @Value("${OPENVIDU.PASSWORD}")
	// private String OPENVIDU_PASSWORD;
	private OpenVidu openVidu;
	private UserService userService;
	private VideoService videoService;

	// @PostConstruct
	// public void init() {
	// 	this.openVidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_PASSWORD);
	// }

	// @PostMapping("/create")
	// public ResponseEntity<?> createVideo(@RequestBody(required = false) VideoCreateRequest videoCreateRequest)
	// 	throws OpenViduJavaClientException, OpenViduHttpException {
	//
	// 	String videoCode = videoService.createVideo(videoCreateRequest);
	//
	// }

	// @PostMapping("/enter")
	// public ResponseEntity<?> enterVideo() {
	//
	// }
}
