package mate.session.dto;

import lombok.Data;
import mate.session.domain.Session;

@Data
public class SessionResponse {
    private Integer userIdx;
    private String nickname;

    public static SessionResponse from(Session session){
        SessionResponse sessionResponse = new SessionResponse();
        sessionResponse.userIdx = session.getUserIdx();
        sessionResponse.nickname = session.getNickname();
        return sessionResponse;
    }
}
