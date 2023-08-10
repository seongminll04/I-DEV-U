package mate.domain.match;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import mate.domain.user.User;

import javax.persistence.*;

@Entity
@Getter
@RequiredArgsConstructor
@Table(name = "match_user")
@Builder
@AllArgsConstructor
public class MatchUser {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idx;

    @OneToOne
    @JoinColumn(name = "user_idx")
    private User user;


}
