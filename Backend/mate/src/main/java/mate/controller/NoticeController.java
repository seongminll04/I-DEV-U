package mate.controller;

import java.util.HashMap;
import java.util.Map;

import lombok.RequiredArgsConstructor;
import mate.dto.notice.NoticeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import mate.domain.notice.NoticeBoard;
import mate.repository.NoticeRepository;
import mate.service.NoticeService;

@RestController
@RequestMapping("/notice")
@CrossOrigin(origins = {})
@RequiredArgsConstructor
public class NoticeController {

	private final NoticeService noticeService;

	@PostMapping("/write")
	public ResponseEntity<Map<String, Object>> writeNotice(@RequestBody NoticeDto noticeDto) {
		Map<String, Object> map = new HashMap<>();
		noticeService.writeNotice(noticeDto);
		map.put("resmsg", "공지사항 작성성공");
		return ResponseEntity.ok(map);
	}

	@GetMapping("/detail/{noticeIdx}")
	public ResponseEntity<Map<String, Object>> detailNotice(@PathVariable("noticeIdx") int noticeIdx) {
		Map<String, Object> map = new HashMap<>();

		NoticeBoard notice = noticeService.detailNotice(noticeIdx);

		map.put("notice", notice);

		return ResponseEntity.ok(map);
	}

	@PutMapping("/modify")
	public ResponseEntity<Map<String, Object>> modifyNotice(@RequestBody NoticeDto noticeDto) {
		Map<String, Object> map = new HashMap<>();

		noticeService.modifyNotice(noticeDto);
		map.put("resmsg", "공지사항 수정성공");
		return ResponseEntity.ok(map);
	}

	@DeleteMapping("/delete/{noticeIdx}")
	public ResponseEntity<Map<String, Object>> deleteNotice(@RequestParam("noticeIdx") int noticeIdx) {
		Map<String, Object> map = new HashMap<>();

		noticeService.deleteNotice(noticeIdx);
		map.put("resmsg", "공지사항 삭제성공");
		return ResponseEntity.ok(map);
	}

	@GetMapping("/list")
	public ResponseEntity<Map<String, Object>> listNotice() {
		System.out.println("noticeAll");
		Map<String, Object> map = new HashMap<>();

		map.put("list", noticeService.listNotice().stream().map(notice -> {
			NoticeDto dto = new NoticeDto();
			dto.setIdx(notice.getIdx());
			dto.setTitle(notice.getTitle());
			dto.setContent(notice.getContent());
			dto.setCreatedAt(notice.getCreatedAt());

			return dto;
		}));
		return ResponseEntity.ok(map);
	}

	@GetMapping("/list/top")
	public ResponseEntity<Map<String, Object>> listNoticeTop() {
		System.out.println("noticeAll");
		Map<String, Object> map = new HashMap<>();

		map.put("list", noticeService.listNoticeTop4());
		return ResponseEntity.ok(map);
	}

	@GetMapping("/find")
	public ResponseEntity<Map<String, Object>> listNotice(
			@RequestParam(value = "keyWord", required = false) String keyWord) {
		System.out.println("keyWord = " + keyWord);
		Map<String, Object> map = new HashMap<>();

		map.put("list", noticeService.listNoticeByKeyword(keyWord));
		return ResponseEntity.ok(map);
	}

	@GetMapping("/find/title")
	public ResponseEntity<Map<String, Object>> findNoticeByTitle(
		@RequestParam(value = "keyWord", required = false) String keyWord) {
		System.out.println("title = " + keyWord);
		Map<String, Object> map = new HashMap<>();

		map.put("list", noticeService.listNoticeByTitle(keyWord));
		return ResponseEntity.ok(map);
	}

	@GetMapping("/find/content")
	public ResponseEntity<Map<String, Object>> findNoticeByContent(
			@RequestParam(value = "keyWord", required = false) String keyWord) {
		System.out.println("content = " + keyWord);
		Map<String, Object> map = new HashMap<>();

		map.put("list", noticeService.listNoticeByContent(keyWord));
		return ResponseEntity.ok(map);
	}
}
