package mate.dto.video;

import lombok.Data;
import mate.domain.video.VideoType;

@Data
public class VideoCreateRequest {
	private int userIdx;
	private String title;
	private String content;
	private VideoType type;
	private String session;
}