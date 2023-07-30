package mate.domain.user;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class UserImage {

    @Id @GeneratedValue
    private int idx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_idx")
    private User user;

    private String imageUrl;
}
