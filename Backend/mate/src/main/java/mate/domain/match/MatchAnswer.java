package mate.domain.match;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class MatchAnswer {

    @Id @GeneratedValue
    private int idx;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_idx")
    private MatchUser matchUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "survey_idx")
    private MatchSurvey matchSurvey;

    private String tag;

}
