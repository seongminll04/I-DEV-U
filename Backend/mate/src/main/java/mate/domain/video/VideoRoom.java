package mate.domain.video;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mate.domain.user.User;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class VideoRoom {

	@Id
	@GeneratedValue
	private int idx;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "manager_idx")
	private User user;

	private String title;
	private String content;
	private int totalNumber;
	@Enumerated(EnumType.STRING)
	private VideoType type;

	private LocalDateTime createdAt;
	private String videoCode;

	@Builder
	public VideoRoom(int idx, User user, String title, String content, int totalNumber, VideoType type,
		LocalDateTime createdAt, String videoCode) {
		this.idx = idx;
		this.user = user;
		this.title = title;
		this.content = content;
		this.totalNumber = totalNumber;
		this.type = type;
		this.createdAt = createdAt;
		this.videoCode = videoCode;
	}

	public void updateTotalNumber() {
		this.totalNumber += 1;
	}
}
