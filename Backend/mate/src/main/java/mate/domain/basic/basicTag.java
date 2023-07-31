package mate.domain.basic;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class basicTag {

    @Id @GeneratedValue
    private int idx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "survey_idx")
    private basicSurvey basicSurvey;

    private String tag;
}
