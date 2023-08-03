package mate.dto.user;

import lombok.Data;

import java.util.List;

@Data
public class UserBasicSurvey {

    private Integer userIdx;
    private List<SurveyResult> surveyResult;

}

