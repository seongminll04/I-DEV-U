package mate.dto.notice;


import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NoticeDto {

    private int userIdx;

    private String title;

    private String content;

    private String type;
}
