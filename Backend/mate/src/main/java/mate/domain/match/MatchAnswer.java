package mate.domain.match;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import mate.domain.user.User;

@Entity
@Getter
@RequiredArgsConstructor
@Table(name = "match_answer")
@Builder
@AllArgsConstructor
public class MatchAnswer {

	// @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	// private int idx;
	//
	// @OneToOne(fetch = FetchType.LAZY)
	// @JoinColumn(name = "user_idx")
	// private MatchUser matchUser;
	//
	// @ManyToOne(fetch = FetchType.LAZY)
	// @JoinColumn(name = "survey_idx")
	// private MatchSurvey matchSurvey;
	//
	// private String tag;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idx;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "user_idx")
	private User user;

	private Integer surveyIdx;

	private String tag;
}
