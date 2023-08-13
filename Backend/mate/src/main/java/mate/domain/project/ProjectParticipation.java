package mate.domain.project;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mate.domain.user.User;

@Entity
@Table(name = "project_participation")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ProjectParticipation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idx;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "project_idx")
	private Project project;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_idx")
	private User user;

	// Getters and setters, constructors, and other methods
	// ...
}
