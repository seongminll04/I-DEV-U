package mate.domain.user;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class UserSetting {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idx;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_idx")
    private User user;
    private String chatInvitation;
    private String videoInvitation;

}
