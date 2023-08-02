package mate.domain.notice;

import java.time.LocalDateTime;

import javax.persistence.*;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import mate.domain.user.User;

@Entity
@Getter
@RequiredArgsConstructor
public class NoticeBoard {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idx;

	//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "user_idx")
	//	private User user;
	private int userIdx;

	private String title;

	private String content;

	private LocalDateTime createdAt;

	@Enumerated(EnumType.STRING)
	private NoticeBoardType type;

	// Constructors, getters, and setters (omitted for brevity)
}