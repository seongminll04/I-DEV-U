package mate.inquiry.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mate.alarm.dto.UserResponse;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InquiryRequest {

    private Integer userIdx;
    private String title;
    private String content;

}
