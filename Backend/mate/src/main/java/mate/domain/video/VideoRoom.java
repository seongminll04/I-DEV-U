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

import lombok.*;
import mate.domain.user.User;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
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
	private String ovSession;

	public void updateTotalNumber() {
		this.totalNumber += 1;
	}
}
