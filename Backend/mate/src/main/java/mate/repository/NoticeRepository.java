package mate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mate.domain.Notice;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Integer> {
	List<Notice> findNoticeByTitleContaining(String keyword);
}
