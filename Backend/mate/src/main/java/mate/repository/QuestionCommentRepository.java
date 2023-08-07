package mate.repository;

import mate.domain.question.QuestionBoardComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionCommentRepository extends JpaRepository<QuestionBoardComment, String> {
   List<QuestionBoardComment> findByQuestionBoardIdxOrderByIdx(int questionBoardIdx);
}
