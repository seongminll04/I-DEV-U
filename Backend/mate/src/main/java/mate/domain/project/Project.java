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

import mate.domain.user.User;

@Entity
@Table(name = "project")
public class Project {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idx;

	@ManyToOne
	@JoinColumn(name = "manager_idx")
	private User manager;

	@Column(name = "title")
	private String title;

	@Column(name = "content")
	private String content;

	@Column(name = "total_num")
	private Integer totalNum;

	@Column(name = "now_num")
	private Integer nowNum;

	@Column(name = "status")
	private String status;

	@Column(name = "type")
	private String type;

	@OneToMany(mappedBy = "project", fetch = FetchType.LAZY)
	private List<ProjectParticipation> projectParticipation;

	@OneToMany(mappedBy = "project", fetch = FetchType.LAZY)
	private List<ProjectTech> projectTeches;
	
	// Getters and setters, constructors, and other methods
	// ...
}
