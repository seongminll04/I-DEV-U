package mate.service.partner;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import mate.dto.partner.PartnerDto;
import mate.dto.partner.TagDto;
import mate.repository.partner.PartnerRepository;
import mate.repository.user.UserRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class PartnerService {

	private final PartnerRepository partnerRepository;
	private final UserRepository userRepository;

	public List<PartnerDto> listPartner(List<TagDto> input) {

		List<String> tagList = new ArrayList<>();

		for (TagDto tagDto : input) {
			tagList.add(tagDto.getTag());
		}

		List<Object> partners = partnerRepository.listPartner(tagList, tagList.size());

		List<PartnerDto> list = new ArrayList<>();

		for (Object o : partners) {
			Object[] result = (Object[])o;

			// Assuming the order of elements in the array corresponds to the order of fields in PartnerDto
			String name = (String)result[0];
			String nickname = (String)result[1];
			Long percent = (Long)result[2];

			PartnerDto partnerDto = new PartnerDto();
			partnerDto.setName(name);
			partnerDto.setNickname(nickname);
			partnerDto.setPercent(percent);

			list.add(partnerDto);
		}

		return list;
	}

	public Object detailPartner(int userIdx) {
		Object detailPartner = partnerRepository.detailPartner(userIdx);

		// List<UserDto> list = new ArrayList<>();
		//
		// for (Object o : detailPartner) {
		// 	Object[] result = (Object[])o;
		//
		// 	// Assuming the order of elements in the array corresponds to the order of fields in PartnerDto
		// 	Long userIdx
		// 	String name = (String)result[0];
		// 	String nickname = (String)result[1];
		// 	Long percent = (Long)result[2];
		//
		// 	PartnerDto partnerDto = new PartnerDto();
		// 	partnerDto.setName(name);
		// 	partnerDto.setNickname(nickname);
		// 	partnerDto.setPercent(percent);
		//
		// 	list.add(partnerDto);
		// }

		return detailPartner;
	}

}
