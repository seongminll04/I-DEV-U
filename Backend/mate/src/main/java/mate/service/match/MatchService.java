package mate.service.match;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;

import mate.domain.basic.BasicAnswer;
import mate.dto.match.MatchDetailDto;
import mate.repository.user.BasicRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mate.domain.match.MatchAnswer;
import mate.domain.match.MatchUser;
import mate.domain.user.User;
import mate.dto.match.MatchDto;
import mate.dto.match.MatchSurvey;
import mate.dto.user.SurveyResult;
import mate.repository.match.MatchRepository;
import mate.repository.match.MatchUserRepository;
import mate.repository.user.UserRepository;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class MatchService {

	private final MatchRepository matchRepository;
	private final UserRepository userRepository;
	private final MatchUserRepository matchUserRepository;
	private final BasicRepository basicRepository;

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

	public List<MatchDto> listMatchUser(int userIdx) {
		List<MatchAnswer> answers = matchRepository.findByUser(userIdx);

		for (MatchAnswer ma : answers) {
			System.out.println(ma.getTag());
		}

		User user = userRepository.findByIdx(userIdx).get();

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
			Long percent = (Long)result[2];

			// 생년월일 데이터베이스로부터 가져오는 부분을 시뮬레이션합니다.
			LocalDate birthDateFromDatabase = user.getBirth(); // 생년월일 설정

			// 현재 날짜 가져오기
			LocalDate currentDate = LocalDate.now();

			// 나이 계산
			Period agePeriod = Period.between(birthDateFromDatabase, currentDate);
			int age = agePeriod.getYears();

			MatchDto matchDto = new MatchDto();
			matchDto.setUserIdx(Idx);
			matchDto.setNickname(nickname);
			matchDto.setFace("고양이");
			matchDto.setPercent(percent);
			matchDto.setAge(age);

			output.add(matchDto);
		}

		return output;
	}

	public void detailMatchUser(int userIdx) {
		List<MatchAnswer> answer = matchRepository.findByUser(userIdx);

		String work = basicRepository.findWork(userIdx);
		List<String> language = basicRepository.findLanguage(userIdx);
		String location = basicRepository.findLocation(userIdx);
		String job = basicRepository.findJob(userIdx);

	}

}
