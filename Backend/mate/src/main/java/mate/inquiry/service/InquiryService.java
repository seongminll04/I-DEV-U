package mate.inquiry.service;

import lombok.RequiredArgsConstructor;
import mate.controller.Result;
import mate.domain.user.Role;
import mate.domain.user.User;
import mate.global.exception.NotFoundException;
import mate.inquiry.domain.Inquiry;
import mate.inquiry.domain.InquiryRepository;
import mate.inquiry.dto.AnswerRequest;
import mate.inquiry.dto.InquiryRequest;
import mate.inquiry.dto.InquiryResponse;
import mate.inquiry.dto.InquiryUpdateRequest;
import mate.repository.user.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static mate.global.exception.NotFoundException.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class InquiryService {

    private final InquiryRepository inquiryRepository;
    private final UserRepository userRepository;

    @Transactional
    public Result createInquiry(InquiryRequest request) {

        Inquiry inquiry = Inquiry.createInquiry(request);
        inquiryRepository.save(inquiry);

        return Result.builder().data(inquiry).status(ResponseEntity.ok("문의 등록")).build();
    }

    public Result list() {

        List<Inquiry> list = inquiryRepository.findList();
        if (list.isEmpty()){
            return Result.builder().data(list).status(ResponseEntity.ok("문의 없음")).build();
        }
        return Result.builder().data(list).status(ResponseEntity.ok("문의 리스트")).build();
    }

    public Result detail(Integer idx, Integer userIdx) {

        Inquiry inquiry = inquiryRepository.findDetail(idx)
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));

        User user = userRepository.findByIdx(inquiry.getUserIdx()).orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        if (!Objects.equals(user.getIdx(), userIdx)) return Result.builder().status("사용자가 등록한 문의만 읽을 수 있습니다.").build();

        InquiryResponse response = InquiryResponse.from(inquiry, user);

        return Result.builder().data(response).status(ResponseEntity.ok("문의 사항 상세 정보")).build();
    }

    @Transactional
    public Result delete(Integer idx) {
        inquiryRepository.deleteByIdx(idx);
        return Result.builder().status(ResponseEntity.ok("삭제 성공")).build();
    }

    @Transactional
    public Result updateInquiry(InquiryUpdateRequest request) {

        Inquiry inquiry = inquiryRepository.findDetail(request.getInquiryIdx())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        if(inquiry.getUserIdx() != request.getUserIdx()) return Result.builder().status("본인 문의만 수정할 수 있습니다.").build();

        inquiry.updateInquiry(request);

        return Result.builder().data(inquiry).status(ResponseEntity.ok("삭제 성공")).build();
    }

    @Transactional
    public Result answer(AnswerRequest request) {

        Inquiry inquiry = inquiryRepository.findDetail(request.getInquiryIdx())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        User user = userRepository.findByIdx(request.getUserIdx()).orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        if (user.getRole() == Role.USER) return Result.builder().status("ADMIN 계정만 등록할 수 있습니다.").build();

        inquiry.answer(request);
        return Result.builder().data(inquiry).status(ResponseEntity.ok("답변 성공")).build();
    }


}
