package mate.service.user;

import lombok.RequiredArgsConstructor;
import mate.domain.basic.BasicAnswer;
import mate.domain.user.User;
import mate.dto.user.Survey;
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
public class BasicService {

    private final BasicRepository basicRepository;
    private final UserRepository userRepository;


    public void insertSurvey(UserBasicSurvey userBasicSurvey) throws Exception{

        Optional<User> userTemp = userRepository.findByIdx(userBasicSurvey.getUserIdx());
        if (userTemp.isEmpty()) {
            throw new Exception("존재하지 않는 회원입니다.");
        }
        List<SurveyResult> surveyResult = userBasicSurvey.getSurveyResult();
        User user = userTemp.get();
        for (SurveyResult result : surveyResult) {
            List<Survey> surveys = result.getSurvey();
            for (Survey survey : surveys) {
                List<String> tagList = survey.getTagList();
                Integer surveyIdx = survey.getSurveyIdx();
                for (String tag : tagList) {
                    basicRepository.saveAndFlush(new BasicAnswer(user, surveyIdx,tag));
                }
            }
        }
    }

}
