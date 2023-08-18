package mate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mate.domain.notice.NoticeBoard;

@Repository
public interface NoticeRepository extends JpaRepository<NoticeBoard, Integer> {
	List<NoticeBoard> findByTitleContainingOrderByIdxDesc(String keyword);
	List<NoticeBoard> findByContentContainingOrderByIdxDesc(String keyword);
	List<NoticeBoard> findTop4ByOrderByIdxDesc();
	List<NoticeBoard> findByTitleContainingOrContentContaining(String keyword1, String keyword2);
}
