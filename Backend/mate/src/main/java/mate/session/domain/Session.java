package mate.session.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Session {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idx;
    private Integer userIdx;
    private String nickname;

    public static Session createSession(Integer userIdx, String nickname){
        Session session = new Session();
        session.userIdx = userIdx;
        session.nickname = nickname;
        return session;
    }


}
