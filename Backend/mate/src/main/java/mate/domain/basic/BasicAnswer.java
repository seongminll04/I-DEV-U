package mate.domain.basic;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import mate.domain.user.User;

import javax.persistence.*;

@Entity
@Getter
@RequiredArgsConstructor
public class BasicAnswer {

    @Id @GeneratedValue
    private Integer idx;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_idx")
    private User user;

    private Integer surveyIdx;

    private String tag;


    public BasicAnswer(User user, Integer surveyIdx, String tag) {
        this.user = user;
        this.surveyIdx = surveyIdx;
        this.tag = tag;
    }
}
