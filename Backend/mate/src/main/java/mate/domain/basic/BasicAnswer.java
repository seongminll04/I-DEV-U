package mate.domain.basic;

import lombok.Getter;
import mate.domain.user.User;

import javax.persistence.*;

@Entity
@Getter
public class BasicAnswer {

    @Id @GeneratedValue
    private int idx;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_idx")
    private User user;

    private Integer surveyIdx;

    private String tag;

}
