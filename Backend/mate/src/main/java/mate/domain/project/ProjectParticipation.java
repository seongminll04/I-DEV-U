package mate.domain.project;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import mate.domain.user.User;

@Entity
@Table(name = "project_participation")
@Getter
public class ProjectParticipation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idx;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "project_idx")
	private Project project;
//	@Column(name = "project_idx")
//	private int projectIdx;

//	@ManyToOne
//	@JoinColumn(name = "user_idx")
//	private User user;
	@Column(name = "user_idx")
	private int userIdx;

	// Getters and setters, constructors, and other methods
	// ...
}
