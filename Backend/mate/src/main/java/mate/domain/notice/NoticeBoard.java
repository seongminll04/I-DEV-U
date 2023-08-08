package mate.domain.notice;

import java.time.LocalDateTime;

import javax.persistence.*;

import lombok.*;
import mate.domain.user.User;
import org.springframework.data.annotation.CreatedDate;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class NoticeBoard {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idx;

//	@ManyToOne(fetch = FetchType.LAZY)
	@ManyToOne
	@JoinColumn(name = "user_idx")
	private User user;
//	private int userIdx;

	private String title;

	private String content;

	@CreatedDate
	private LocalDateTime createAt;

	@Enumerated(EnumType.STRING)
	private NoticeBoardType type;

	// Constructors, getters, and setters (omitted for brevity)
}