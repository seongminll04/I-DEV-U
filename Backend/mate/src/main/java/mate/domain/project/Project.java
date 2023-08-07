package mate.domain.project;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.*;
import mate.domain.user.User;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
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
	private String type;

	@OneToMany(mappedBy = "project", fetch = FetchType.LAZY)
	private List<ProjectParticipation> projectParticipation;

	@OneToMany(mappedBy = "project", fetch = FetchType.LAZY)
	private List<ProjectLanguage> projectLanguages;

	@OneToMany(mappedBy = "project", fetch = FetchType.LAZY)
	private List<ProjectTech> projectTechs;
}

