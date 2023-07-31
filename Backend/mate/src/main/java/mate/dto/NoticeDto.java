package mate.dto;


import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NoticeDto {

    private int idx;

    private int userIdx;

    private String title;

    private String content;

    private LocalDateTime createdAt;

    private String type;
}
