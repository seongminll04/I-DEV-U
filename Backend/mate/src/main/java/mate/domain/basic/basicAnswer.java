package mate.domain.basic;

import lombok.Getter;
import mate.domain.user.User;

import javax.persistence.*;

@Entity
@Getter
public class basicAnswer {

    @Id @GeneratedValue
    private int idx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "survey_idx")
    private basicSurvey basicSurvey;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_idx")
    private User user;

    private String tag;


}
