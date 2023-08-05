package mate.dto.video;

import lombok.Data;
import mate.domain.user.User;
import mate.domain.video.VideoType;

import javax.persistence.*;
import java.time.LocalDateTime;


//"title (VARCHAR)": "화상채팅방 이름",
//        "OVSession(VARCHAR)": "화상채팅방 세션값"
//        "totalNum (INT)": "총 인원",
//        "nowNum (INT)": "현재 모집된 인원",
//        "modify (boolean)": "내가
@Data
public class VideoDto {
    private int idx;
    private String title;
    private int totalNumber;
    private int nowNum;
    private String ovSession;
    private boolean modify;

    public VideoDto(int idx, String title, int totalNumber, int nowNum, String ovSession, boolean modify) {
        this.idx = idx;
        this.title = title;
        this.totalNumber = totalNumber;
        this.nowNum = nowNum;
        this.ovSession = ovSession;
        this.modify = modify;
    }
}
