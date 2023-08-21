package mate.inquiry.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.*;
import mate.inquiry.dto.AnswerRequest;
import mate.inquiry.dto.InquiryRequest;
import mate.inquiry.dto.InquiryUpdateRequest;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Inquiry {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idx;
	private Integer userIdx; // Integer로 선언하여 NULL 허용
	private String title;
	private String content;
	private String answer;
	public static Inquiry createInquiry(InquiryRequest request){

		Inquiry inquiry = new Inquiry();
		inquiry.userIdx = request.getUserIdx();
		inquiry.title = request.getTitle();
		inquiry.content = request.getContent();

		return inquiry;
	}

	public void updateInquiry(InquiryUpdateRequest request){
		this.title = request.getTitle();
		this.content = request.getContent();
	}

	public void answer(AnswerRequest request){
		this.answer = request.getAnswer();
	}


}
