package mate.repository;

import mate.domain.question.QuestionBoardLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionLikeRepository extends JpaRepository<QuestionBoardLike, Integer> {
}
