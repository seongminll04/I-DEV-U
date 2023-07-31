package mate.domain.match;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
public class MatchSurvey {

    @Id @GeneratedValue
    private int idx;

    private String title;

}
