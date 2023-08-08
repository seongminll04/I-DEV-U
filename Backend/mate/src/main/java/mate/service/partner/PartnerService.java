package mate.service.partner;

import java.util.ArrayList;
import java.util.List;

import mate.domain.user.User;
import mate.dto.partner.DetailDto;
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

	public List<PartnerDto> listPartner(List<String> input) {

//		List<String> tagList = new ArrayList<>();
//
//		for (TagDto tagDto : input) {
//			tagList.add(tagDto.getTag());
//		}

		List<Object> partners = partnerRepository.listPartner(input, input.size());

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

	public DetailDto detailPartner(int userIdx) {
		List<Object> techs = partnerRepository.findTech(userIdx);

		List<String> techList = new ArrayList<>();

		for (Object o : techs) {
			Object[] result = (Object[])o;

			String tech = (String)result[1];

			techList.add(tech);
		}

		User user = userRepository.findById(userIdx).get();

		DetailDto detailPartner = new DetailDto();

		detailPartner.setUserIdx(user.getIdx());
		detailPartner.setName(user.getName());
		detailPartner.setNickname(user.getNickname());
		detailPartner.setIntro(user.getIntro());
		detailPartner.setTechList(techList);

		return detailPartner;
	}

}
