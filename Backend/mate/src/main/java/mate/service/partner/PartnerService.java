package mate.service.partner;

import lombok.RequiredArgsConstructor;
import mate.domain.basic.BasicAnswer;
import mate.domain.partner.PartnerDto;
import mate.dto.partner.TagDto;
import mate.repository.partner.PartnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PartnerService {

    private final PartnerRepository partnerRepository;

    public List<PartnerDto> listPartner(List<TagDto> input) {

        List<String> tagList = new ArrayList<>();

        for (TagDto tagDto : input) {
            tagList.add(tagDto.getTag());
        }

        List<mate.domain.partner.PartnerDto> list = partnerRepository.findPartner(tagList, tagList.size());

        return list;
    }

}
