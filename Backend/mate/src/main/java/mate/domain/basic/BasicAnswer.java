package mate.domain.basic;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import mate.domain.user.User;

import javax.persistence.*;

@Entity
@Getter
@RequiredArgsConstructor
@Builder
@AllArgsConstructor
public class BasicAnswer {

    @Id @GeneratedValue
    private Integer idx;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_idx")
    private User user;

    private Integer surveyIdx;

    private String tag;

}
