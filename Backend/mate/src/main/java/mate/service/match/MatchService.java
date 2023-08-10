package mate.service.match;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mate.domain.match.MatchAnswer;
import mate.domain.user.User;
import mate.dto.match.MatchSurvey;
import mate.dto.user.SurveyResult;
import mate.repository.match.MatchRepository;
import mate.repository.user.UserRepository;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class MatchService {

	private final MatchRepository matchRepository;
	private final UserRepository userRepository;

	public void surveyRegister(MatchSurvey matchSurvey) {
		User user = userRepository.findByIdx(matchSurvey.getUserIdx()).get();
		List<SurveyResult> surveyResult = matchSurvey.getSurveyResult();

		for (SurveyResult result : surveyResult) {
			List<String> tagList = result.getTagList();
			Integer surveyIdx = result.getSurveyIdx();
			for (String tag : tagList) {
				matchRepository.saveAndFlush(MatchAnswer.builder()
					.user(user)
					.surveyIdx(surveyIdx)
					.tag(tag)
					.build());
			}
		}
	}
}
