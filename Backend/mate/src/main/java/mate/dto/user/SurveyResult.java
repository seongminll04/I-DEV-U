package mate.dto.user;

import lombok.Data;

import java.util.List;

@Data
public class SurveyResult {
    private Integer surveyIdx;
    private String surveyTitle;
    private List<String> tagList;
}

