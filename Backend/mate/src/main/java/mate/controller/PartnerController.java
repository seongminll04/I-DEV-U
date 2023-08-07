package mate.controller;

import lombok.RequiredArgsConstructor;
import mate.domain.basic.BasicAnswer;
import mate.domain.partner.PartnerDto;
import mate.dto.partner.TagDto;
import mate.dto.project.ProjectDto;
import mate.service.partner.PartnerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/partner")
@CrossOrigin(origins = {})
@RequiredArgsConstructor
public class PartnerController {

    private final PartnerService partnerService;

    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> listPartner(@RequestBody Map<String, List<TagDto>> input) {
        Map<String, Object> map = new HashMap<>();

        System.out.println(input.get("tagList"));

//        try {
            List<PartnerDto> list = partnerService.listPartner(input.get("tagList"));

            map.put("userList", list);
            map.put("resmsg", "동료 리스트 조회 성공");
//        } catch (Exception e) {
//            map.put("resmsg", "동료 리스트 조회 실패");
//        }

        return ResponseEntity.ok(map);
    }

}
