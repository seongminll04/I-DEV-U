package mate.dto.video;

import lombok.Data;
import mate.domain.user.User;
import mate.domain.video.VideoType;

import javax.persistence.*;
import java.time.LocalDateTime;

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
