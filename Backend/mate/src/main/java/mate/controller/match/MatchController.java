package mate.controller.match;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import mate.dto.match.MatchSurvey;
import mate.service.match.MatchService;

@RestController
@RequestMapping("/date")
@CrossOrigin(origins = {})
@RequiredArgsConstructor
public class MatchController {

	private final MatchService matchService;

	@PostMapping("/register")
	public ResponseEntity<Map<String, Object>> surveyRegister(@RequestBody MatchSurvey matchSurvey) {
		Map<String, Object> map = new HashMap<>();

		// try {
		matchService.surveyRegister(matchSurvey);
		map.put("resmsg", "소개팅 등록 성공");
		// } catch (Exception e) {
		// map.put("resmsg", "소개팅 등록 실패");
		// }

		return ResponseEntity.ok(map);
	}
}
