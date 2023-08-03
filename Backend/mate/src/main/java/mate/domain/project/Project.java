package mate.domain.project;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Getter;
import mate.domain.user.User;

@Entity
@Getter
public class Project {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idx;

	@ManyToOne
	@JoinColumn(name = "manager_idx")
	private User manager;

	private String title;

	private String content;

	private Integer totalNum;

	private Integer nowNum;

	private String status;

	private Integer front;
	private Integer maxFront;
	private Integer back;
	private Integer maxBack;
	private String text;


	@OneToMany(mappedBy = "project", fetch = FetchType.LAZY)
	private List<ProjectParticipation> projectParticipation;

	@OneToMany(mappedBy = "project", fetch = FetchType.LAZY)
	private List<ProjectTech> projectTeches;

	// Getters and setters, constructors, and other methods
	// ...
}
