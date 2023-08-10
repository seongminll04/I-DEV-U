package mate.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import mate.domain.notice.NoticeBoardType;
import mate.domain.user.User;
import mate.dto.notice.NoticeDto;
import mate.repository.user.UserRepository;
import org.hibernate.usertype.UserType;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import mate.domain.notice.NoticeBoard;
import mate.repository.NoticeRepository;

@Service
@RequiredArgsConstructor
public class NoticeService {

	private final NoticeRepository noticeRepository;
	private final UserRepository userRepository;

	public void writeNotice(NoticeDto noticeDto) {
		User user = userRepository.findById(noticeDto.getUserIdx()).get();

		noticeRepository.save(NoticeBoard.builder()
						.user(user)
						.title(noticeDto.getTitle())
						.content(noticeDto.getContent())
						.createdAt(LocalDateTime.now())
						.type(NoticeBoardType.A)
				.build());
	}

	public NoticeBoard detailNotice(int noticeIdx) {
		Optional<NoticeBoard> notice = noticeRepository.findById(noticeIdx);

		return notice.get();
	}

	public void modifyNotice(NoticeDto noticeDto) {
		noticeRepository.save(NoticeBoard.builder()
						.title(noticeDto.getTitle())
						.content(noticeDto.getContent())
				.build());
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
		return noticeRepository.findTop4ByOrderByIdxDesc();
	}

	// 검색어를 사용한 리스트 조회(제목)
	public List<NoticeBoard> listNoticeByTitle(String keyWord) {
		return noticeRepository.findNoticeByTitleContainingOrderByIdxDesc(keyWord);
	}

	public List<NoticeBoard> listNoticeByContent(String keyWord) {
		return noticeRepository.findNoticeByContentContainingOrderByIdxDesc(keyWord);
	}
}
