package mate.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import mate.domain.notice.NoticeBoard;
import mate.repository.NoticeRepository;
import mate.service.NoticeService;

@RestController
@RequestMapping("/notice")
@CrossOrigin(origins = {})
public class NoticeController {

	@Autowired
	NoticeService noticeService;

	@Autowired
	NoticeRepository noticeRepository;

	public NoticeController(NoticeService noticeService, NoticeRepository noticeRepository) {
		this.noticeService = noticeService;
		this.noticeRepository = noticeRepository;
	}

	@PostMapping("/write")
	public ResponseEntity<Map<String, Object>> writeNotice(NoticeBoard notice) {
		Map<String, Object> map = new HashMap<>();

		noticeService.writeNotice(notice);

		return ResponseEntity.ok(map);
	}

	@GetMapping("/detail/{noticeIdx}")
	public ResponseEntity<Map<String, Object>> detailNotice(@RequestParam("noticeIdx") int noticeIdx) {
		Map<String, Object> map = new HashMap<>();

		NoticeBoard notice = noticeService.detailNotice(noticeIdx);

		map.put("notification", notice);

		return ResponseEntity.ok(map);
	}

	@PutMapping("/modify")
	public ResponseEntity<Map<String, Object>> modifyNotice(NoticeBoard notice) {
		Map<String, Object> map = new HashMap<>();

		noticeService.modifyNotice(notice);

		return ResponseEntity.ok(map);
	}

	@DeleteMapping("/delete/{noticeIdx}")
	public ResponseEntity<Map<String, Object>> deleteNotice(@RequestParam("noticeIdx") int noticeIdx) {
		Map<String, Object> map = new HashMap<>();

		noticeService.deleteNotice(noticeIdx);

		return ResponseEntity.ok(map);
	}

//	@GetMapping("/list/{keyWord}")
//	public ResponseEntity<Map<String, Object>> listNotice(
//		@RequestParam(value = "keyWord", required = false) String keyWord) {
//		System.out.println("keyWord = " + keyWord);
//		Map<String, Object> map = new HashMap<>();
//
//		if (keyWord == null) {
//			map.put("list", noticeService.listNotice());
//			return ResponseEntity.ok(map);
//		} else {
//			map.put("list", noticeService.listNoticeByKeyword(keyWord));
//			return ResponseEntity.ok(map);
//		}
//	}

	@GetMapping("/list")
	public ResponseEntity<Map<String, Object>> listNotice() {
		System.out.println("noticeAll");
		Map<String, Object> map = new HashMap<>();

		map.put("list", noticeService.listNotice());
		return ResponseEntity.ok(map);
	}

	@GetMapping("/find/title/{keyWord}")
	public ResponseEntity<Map<String, Object>> findNoticeByTitle(
		@PathVariable(value = "keyWord", required = false) String keyWord) {
		System.out.println("title = " + keyWord);
		Map<String, Object> map = new HashMap<>();

		map.put("list", noticeService.listNoticeByTitle(keyWord));
		return ResponseEntity.ok(map);
	}

	@GetMapping("/find/content/{keyWord}")
	public ResponseEntity<Map<String, Object>> findNoticeByContent(
			@PathVariable(value = "keyWord", required = false) String keyWord) {
		System.out.println("content = " + keyWord);
		Map<String, Object> map = new HashMap<>();

		map.put("list", noticeService.listNoticeByContent(keyWord));
		return ResponseEntity.ok(map);
	}
}
