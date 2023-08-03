package mate.dto.video;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mate.domain.video.VideoType;

@Getter
@NoArgsConstructor
@Setter
public class VideoCreateRequest {
	private String email;
	private String title;
	private String content;
	private VideoType type;
	private String sessionId;
}