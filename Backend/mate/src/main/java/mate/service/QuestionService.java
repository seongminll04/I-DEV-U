package mate.service;

import lombok.RequiredArgsConstructor;
import mate.domain.question.QuestionBoard;
import mate.repository.QuestionRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;

    public void writeQuestion(QuestionBoard questionBoard) {
        questionRepository.save(questionBoard);
    }

    public QuestionBoard detailQuestion(int questionIdx) {
        Optional<QuestionBoard> question = questionRepository.findById(questionIdx);

        return question.get();
    }

    public void modifyQuestion(QuestionBoard questionBoard) {
        questionRepository.save(questionBoard);
    }

    public void deleteQuestion(int questionIdx) {
        questionRepository.deleteById(questionIdx);
    }

    public List<QuestionBoard> getQuestionList(){
        return questionRepository.findAll(Sort.by(Sort.Direction.DESC, "idx"));
    }

    public List<QuestionBoard> getQuestionTop4(){
        return questionRepository.findTop4ByOrderByIdxDesc();
    }

    public List<QuestionBoard> findQuestionByTitle(String keyWord) {
        return questionRepository.findByTitleContainingOrderByIdxDesc(keyWord);
    }

    public List<QuestionBoard> findQuestionByContent(String keyWord) {
        return questionRepository.findByContentContainingOrderByIdxDesc(keyWord);
    }

    public List<QuestionBoard> findQuestionByName(String name) {
        return questionRepository.findByNameOrderByIdxDesc(name);
    }
}
