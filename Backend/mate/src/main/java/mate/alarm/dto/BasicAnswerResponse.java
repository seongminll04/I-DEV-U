package mate.alarm.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mate.domain.basic.BasicAnswer;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BasicAnswerResponse {
    private Integer surveyIdx;
    private String tag;

    public static List<BasicAnswerResponse> from (List<BasicAnswer> basicAnswerList){

        List<BasicAnswerResponse> list = new ArrayList<>();
        for (BasicAnswer basicAnswer : basicAnswerList) {
            BasicAnswerResponse basicAnswerResponse = new BasicAnswerResponse();
            basicAnswerResponse.surveyIdx = basicAnswer.getSurveyIdx();
            basicAnswerResponse.tag = basicAnswer.getTag();
            list.add(basicAnswerResponse);
        }
        return list;
    }

}
