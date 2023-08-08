package mate.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import mate.dto.partner.TagDto;
import mate.service.partner.PartnerService;

@RestController
@RequestMapping("/partner")
@CrossOrigin(origins = {})
@RequiredArgsConstructor
public class PartnerController {

	private final PartnerService partnerService;

	@GetMapping("/list")
	public ResponseEntity<Map<String, Object>> listPartner(@RequestBody Map<String, List<String>> input) {
		Map<String, Object> map = new HashMap<>();

		try {
			map.put("userList", partnerService.listPartner(input.get("tagList")));
			map.put("resmsg", "동료 리스트 조회 성공");
		} catch (Exception e) {
			map.put("resmsg", "동료 리스트 조회 실패");
		}

		return ResponseEntity.ok(map);
	}

	@GetMapping("/detail/{userIdx}")
	public ResponseEntity<Map<String, Object>> detailPartner(@PathVariable("userIdx") int userIdx) {
		Map<String, Object> map = new HashMap<>();

		try {
			map.put("resmsg", "동료 상세정보 조회 성공");
			map.put("user", partnerService.detailPartner(userIdx));
		} catch (Exception e) {
			map.put("resmsg", "동료 상세정보 조회 실패");
		}

		return ResponseEntity.ok(map);
	}

}
