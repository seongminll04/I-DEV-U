package mate.domain.match;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class MatchTag {

    @Id @GeneratedValue
    private int idx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "survey_idx")
    private MatchSurvey matchSurvey;

    @Enumerated(EnumType.STRING)
    private Tag tag;
}
