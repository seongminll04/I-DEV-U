package mate.domain.basic;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
public class BasicTitle {

    @Id @GeneratedValue
    private Integer idx;
    private Integer answerIdx;
    private String title;
}
