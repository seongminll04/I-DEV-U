package mate.domain;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "notice_board")
@Data
public class Notice {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idx;

	@Column(name = "user_idx")
	private int userIdx;

	private String title;

	private String content;

	@Column(name = "created_at")
	private LocalDateTime createdAt;

	private String type;

	// Constructors, getters, and setters (omitted for brevity)
}