package mate.controller.video;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/video")
@CrossOrigin(origins = {})
public class VideoController {

    @Value("https://i9b206.p.ssafy.io:4443")
    private String OPENVIDU_URL;

    @Value("PWB206206")
    private String OPENVIDU_PASSWORD;


}
