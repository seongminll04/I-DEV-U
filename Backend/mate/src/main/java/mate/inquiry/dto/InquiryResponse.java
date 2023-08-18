package mate.inquiry.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mate.alarm.dto.UserResponse;
import mate.domain.user.User;
import mate.inquiry.domain.Inquiry;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InquiryResponse {

    private UserResponse user;
    private Integer inquiryIdx;
    private String title;
    private String content;
    private String answer;


    public static InquiryResponse from(Inquiry inquiry, User user){

        InquiryResponse response = new InquiryResponse();
        response.user = UserResponse.from(user);
        response.inquiryIdx = inquiry.getIdx();
        response.title = inquiry.getTitle();
        response.content = inquiry.getContent();
        response.answer = inquiry.getAnswer();

        return response;
    }

}
