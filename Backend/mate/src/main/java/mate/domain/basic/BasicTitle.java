package mate.domain.basic;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
public class BasicTitle {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idx;
    private Integer answerIdx;
    private String title;
}
