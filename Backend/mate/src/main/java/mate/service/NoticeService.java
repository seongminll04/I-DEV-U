package mate.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import mate.domain.notice.NoticeBoard;
import mate.repository.NoticeRepository;

@Service
public class NoticeService {

	@Autowired
	NoticeRepository noticeRepository;

	public NoticeService(NoticeRepository noticeRepository) {
		this.noticeRepository = noticeRepository;
	}

	public void writeNotice(NoticeBoard notice) {
		noticeRepository.save(notice);
	}

	public NoticeBoard detailNotice(int noticeIdx) {
		Optional<NoticeBoard> notice = noticeRepository.findById(noticeIdx);

		return notice.get();
	}

	public void modifyNotice(NoticeBoard notice) {
		noticeRepository.save(notice);
	}

	public void deleteNotice(int noticeIdx) {
		noticeRepository.deleteById(noticeIdx);
	}

	// 리스트 조회
	public List<NoticeBoard> listNotice() {
		return noticeRepository.findAll(Sort.by(Sort.Direction.DESC, "idx"));
	}

	// 가장 최근 4개만 조회
	public List<NoticeBoard> listNoticeTop4() {
		return noticeRepository.findNoticeTop4OrderByIdxDesc();
	}

	// 검색어를 사용한 리스트 조회(제목)
	public List<NoticeBoard> listNoticeByTitle(String keyWord) {
		return noticeRepository.findNoticeByTitleContainingOrderByIdxDesc(keyWord);
	}

	public List<NoticeBoard> listNoticeByContent(String keyWord) {
		return noticeRepository.findNoticeByContentContainingOrderByIdxDesc(keyWord);
	}
}
