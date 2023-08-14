package mate.inquiry.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mate.controller.Result;
import mate.inquiry.dto.AnswerRequest;
import mate.inquiry.dto.InquiryRequest;
import mate.inquiry.dto.InquiryUpdateRequest;
import mate.inquiry.service.InquiryService;
import org.hibernate.annotations.Parameter;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/inquiry")
@RequiredArgsConstructor
public class InquiryController {

    private final InquiryService inquiryService;

    @PostMapping("/create")
    public Result createInquiry(@RequestBody InquiryRequest request){
        return inquiryService.createInquiry(request);
    }

    @PutMapping("/update")
    public Result updateInquiry(@RequestBody InquiryUpdateRequest request){
        return inquiryService.updateInquiry(request);
    }

    @GetMapping("/list")
    public Result listInquiry(){
        return inquiryService.list();
    }

    @GetMapping("/detail/{idx}")
    public Result detailInquiry(@PathVariable("idx") Integer idx,
                                @RequestParam("userIdx") Integer userIdx){
        return inquiryService.detail(idx, userIdx);
    }

    @DeleteMapping("/delete/{idx}")
    public Result deleteInquiry(@PathVariable("idx") Integer idx,
                                @RequestParam("userIdx") Integer userIdx){
        return inquiryService.delete(idx, userIdx);
    }

    @PutMapping("/answer")
    public Result answerInquiry(@RequestBody AnswerRequest request){
        return inquiryService.answer(request);
    }

}
