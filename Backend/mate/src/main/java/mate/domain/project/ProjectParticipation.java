package mate.domain.project;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import mate.domain.User;

@Entity
@Table(name = "project_participation")
public class ProjectParticipation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idx;

	@ManyToOne
	@JoinColumn(name = "project_idx")
	private Project project;

	@ManyToOne
	@JoinColumn(name = "user_idx")
	private User user;

	// Getters and setters, constructors, and other methods
	// ...
}
