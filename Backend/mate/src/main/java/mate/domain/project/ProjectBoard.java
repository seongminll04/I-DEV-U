package mate.domain.project;

import java.security.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import mate.domain.user.User;

@Entity
@Table(name = "project_board")
public class ProjectBoard {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idx;

//	@ManyToOne
//	@JoinColumn(name = "project_idx")
//	private Project project;
	@Column(name = "project_idx")
	private int projectIdx;

//	@ManyToOne
//	@JoinColumn(name = "user_idx")
//	private User user;
	@Column(name = "user_idx")
	private int userIdx;

	@Column(name = "title")
	private String title;

	@Column(name = "content")
	private String content;

	@Column(name = "created_at")
	private Timestamp createdAt;

	// Getters and setters, constructors, and other methods
	// ...
}
