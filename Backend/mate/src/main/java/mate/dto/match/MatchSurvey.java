package mate.dto.match;

import java.util.List;

import lombok.Data;
import mate.dto.user.SurveyResult;

@Data
public class MatchSurvey {
	private Integer userIdx;
	private List<SurveyResult> surveyResult;

}
