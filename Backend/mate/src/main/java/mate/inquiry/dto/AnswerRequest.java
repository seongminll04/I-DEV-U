package mate.inquiry.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnswerRequest {

    private Integer inquiryIdx;
    private Integer userIdx;
    private String answer;

}
