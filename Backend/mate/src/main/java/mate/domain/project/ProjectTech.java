package mate.domain.project;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;

@Entity
@Getter
public class ProjectTech {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idx;

	@ManyToOne
	@JoinColumn(name = "project_idx")
	private Project project;

	private String language;

	// Getters and setters, constructors, and other methods
	// ...
}