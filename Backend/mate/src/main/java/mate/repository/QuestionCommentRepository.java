package mate.repository;

import mate.domain.question.QuestionBoardComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuestionCommentRepository extends JpaRepository<QuestionBoardComment, Integer> {
   Optional<List<QuestionBoardComment>> findByQuestionBoardIdxOrderByIdxDesc(Integer questionBoardIdx);
}
