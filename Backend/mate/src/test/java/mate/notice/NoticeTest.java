package mate.notice;

import static org.assertj.core.api.AssertionsForClassTypes.*;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import mate.domain.Notice;
import mate.repository.NoticeRepository;
import org.springframework.test.context.junit4.SpringRunner;

@Slf4j
@SpringBootTest
@Transactional
public class NoticeTest {

	@Autowired
	NoticeRepository noticeRepository;

	@Test
	@Transactional
	void 공지사항_작성() {
		Notice notice = new Notice();

		notice.setUserIdx(4);
		notice.setType("운영");
		notice.setTitle("운영공지2");
		notice.setContent("운영공지 내용입니다.");

		Notice savedNotice = noticeRepository.save(notice);

		Optional<Notice> findNotice = noticeRepository.findById(savedNotice.getIdx());

		assertThat(savedNotice).isEqualTo(findNotice.get());
	}

	@Test
	@Transactional
	void 공지사항_검색() {
		List<Notice> list = noticeRepository.findNoticeByTitleContaining("운영");

		log.info("리스트 확인 -> {}", list);
	}

	@Test
	void 공지사항_수정() {
		Notice notice = new Notice();

		notice.setIdx(5);
		notice.setUserIdx(4);
		notice.setTitle("운영공지제목_수정123");
		notice.setContent("운영공지제목수정입니다.123");

		Notice updateNotice = noticeRepository.save(notice);

		log.info("수정한 공지사항 -> {}", updateNotice);
	}

	@Test
	@Transactional
	void 공지사항_삭제() {
		noticeRepository.deleteById(4);

		assertThat(noticeRepository.findById(4)).isEmpty();
	}
}
