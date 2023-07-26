package mate.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mate.domain.Notice;
import mate.repository.NoticeRepository;

@Service
public class NoticeService {

	@Autowired
	NoticeRepository noticeRepository;

	public NoticeService(NoticeRepository noticeRepository) {
		this.noticeRepository = noticeRepository;
	}

	public void writeNotice(Notice notice) {
		noticeRepository.save(notice);
	}

	public Notice detailNotice(int noticeIdx) {
		Optional<Notice> notice = noticeRepository.findById(noticeIdx);

		return notice.get();
	}

	public void modifyNotice(Notice notice) {
		noticeRepository.save(notice);
	}

	public void deleteNotice(int noticeIdx) {
		noticeRepository.deleteById(noticeIdx);
	}

	// 리스트 조회
	public List<Notice> listNotice() {
		return noticeRepository.findAll();
	}

	// 검색어를 사용한 리스트 조회
	public List<Notice> listNoticeByKeyword(String keyWord) {
		return noticeRepository.findNoticeByTitleContaining(keyWord);
	}
}
