package mate.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

	@GetMapping("/list/{keyWord}")
	public ResponseEntity<Map<String, Object>> listNotice(
		@RequestParam(value = "keyWord", required = false) String keyWord) {
		Map<String, Object> map = new HashMap<>();

		if (keyWord == null) {
			map.put("list", noticeService.listNotice());
			return ResponseEntity.ok(map);
		} else {
			map.put("list", noticeService.listNoticeByKeyword(keyWord));
			return ResponseEntity.ok(map);
		}
	}
}
