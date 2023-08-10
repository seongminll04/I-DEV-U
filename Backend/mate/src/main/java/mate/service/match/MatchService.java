package mate.service.match;

import java.util.ArrayList;
import java.util.List;

import mate.domain.match.MatchUser;
import mate.dto.match.MatchDto;
import mate.dto.partner.PartnerDto;
import mate.repository.match.MatchUserRepository;
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
	private final MatchUserRepository matchUserRepository;

	public void registerSurvey(MatchSurvey matchSurvey) {
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

	public void registerMatchUser(int userIdx) {
		User user = userRepository.findByIdx(userIdx).get();

		matchUserRepository.save(MatchUser.builder()
				.user(user)
				.build());
	}

	public void releaseMatchUser(int userIdx) {
		User user = userRepository.findByIdx(userIdx).get();

		matchUserRepository.deleteMatchUserByUser(user);
	}

	public void listMatchUser(int userIdx) {
		List<MatchAnswer> answers = matchRepository.findByUser(userIdx);

		List<String> tag = new ArrayList<>();

		for (MatchAnswer ma : answers) {
			tag.add(ma.getTag());
		}

		List<Object> list = matchRepository.listMatchUser(tag, tag.size());

		List<MatchDto> output = new ArrayList<>();

		for (Object o : list) {
			Object[] result = (Object[])o;

			// Assuming the order of elements in the array corresponds to the order of fields in PartnerDto
			Integer Idx = (Integer)result[0];
			String nickname = (String)result[1];
			String face = (String)result[2];
			Long percent = (Long)result[3];

//			List<String> language = basicRepository.findLanguage(userIdx);
//
//			PartnerDto partnerDto = new PartnerDto();
//			partnerDto.setName(name);
//			partnerDto.setNickname(nickname);
//			partnerDto.setPercent(percent);
//			partnerDto.setLanguageList(language);
//
//			list.add(partnerDto);
		}
	}

}
