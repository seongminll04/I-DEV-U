package mate.domain.notice;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class NoticeImage {

    @Id @GeneratedValue
    private int idx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_idx")
    private NoticeBoard noticeBoard;

    private String imageUrl;

}
