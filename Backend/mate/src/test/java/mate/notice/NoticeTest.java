package mate.notice;

import lombok.extern.slf4j.Slf4j;
import mate.domain.notice.NoticeBoard;
import mate.repository.NoticeRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@Slf4j
@SpringBootTest
@Transactional
public class NoticeTest {

	@Autowired
	NoticeRepository noticeRepository;

	@Test
	@Transactional
	void noticeWrite() {
//		NoticeBoard notice = new NoticeBoard();

//		notice.setUserIdx(4);
//		notice.setType("운영");
//		notice.setTitle("운영공지2");
//		notice.setContent("운영공지 내용입니다.");

//		NoticeBoard savedNotice = noticeRepository.save(notice);
//
//		Optional<NoticeBoard> findNotice = noticeRepository.findById(savedNotice.getIdx());
//
//		assertThat(savedNotice).isEqualTo(findNotice.get());
	}

	@Test
	@Transactional
	void noticeList() {
//		List<NoticeBoard> list = noticeRepository.findNoticeByTitleContaining("운영");

//		log.info("리스트 확인 -> {}", list);
	}

	@Test
	void noticeModify() {
//		NoticeBoard notice = new NoticeBoard();

//		notice.setIdx(5);
//		notice.setUserIdx(4);
//		notice.setTitle("운영공지제목_수정123");
//		notice.setContent("운영공지제목수정입니다.123");

//		NoticeBoard updateNotice = noticeRepository.save(notice);

//		log.info("수정한 공지사항 -> {}", updateNotice);
	}

	@Test
	@Transactional
	void noticeDelete() {
//		noticeRepository.deleteById(4);
//
//		assertThat(noticeRepository.findById(4)).isEmpty();
	}
}
