package mate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mate.domain.notice.NoticeBoard;

@Repository
public interface NoticeRepository extends JpaRepository<NoticeBoard, Integer> {
	List<NoticeBoard> findNoticeByTitleContaining(String keyword);
}
