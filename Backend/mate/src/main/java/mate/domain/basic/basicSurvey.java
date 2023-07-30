package mate.domain.basic;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
public class basicSurvey {

    @Id @GeneratedValue
    private int idx;

    private String title;
}
