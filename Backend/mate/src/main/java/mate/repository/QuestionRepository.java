package mate.repository;

import mate.domain.question.QuestionBoard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<QuestionBoard, Integer> {
    List<QuestionBoard> findByTitleContainingOrderByIdxDesc(String keyWord);
    List<QuestionBoard> findByContentContainingOrderByIdxDesc(String keyWord);
//    List<QuestionBoard> findByNameOrderByIdxDesc(String name);
    List<QuestionBoard> findTop4ByOrderByIdxDesc();
}
