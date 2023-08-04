package mate.service.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mate.domain.basic.BasicAnswer;
import mate.domain.user.User;
import mate.dto.user.SurveyResult;
import mate.dto.user.UserBasicSurvey;
import mate.repository.user.BasicRepository;
import mate.repository.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class BasicService {

    private final BasicRepository basicRepository;
    private final UserRepository userRepository;


    public void insertSurvey(UserBasicSurvey userBasicSurvey) throws Exception{
        log.info("123");
        Optional<User> userTemp = userRepository.findByIdx(userBasicSurvey.getUserIdx());
        if (userTemp.isEmpty()) {
            throw new Exception("존재하지 않는 회원입니다.");
        }
        log.info("123");

        List<SurveyResult> surveyResult = userBasicSurvey.getSurveyResult();
        User user = userTemp.get();
        log.info("123");

        for (SurveyResult result : surveyResult) {
            List<String> tagList = result.getTagList();
            Integer surveyIdx = result.getSurveyIdx();
            for (String tag : tagList) {
                basicRepository.saveAndFlush(BasicAnswer.builder()
                        .user(user).surveyIdx(surveyIdx).tag(tag).build());
            }
        }
    }

}
