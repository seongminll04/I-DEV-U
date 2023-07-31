package mate.domain.match;

import lombok.Getter;
import mate.domain.user.User;

import javax.persistence.*;

@Entity
@Getter
public class MatchUser {

    @Id @GeneratedValue
    private int idx;

    @OneToOne
    @JoinColumn(name = "user_idx")
    private User user;


}
