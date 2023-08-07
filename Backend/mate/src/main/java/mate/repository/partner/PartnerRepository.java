package mate.repository.partner;


import mate.domain.basic.BasicAnswer;
import mate.domain.partner.PartnerDto;
import mate.domain.user.Partner;
import mate.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PartnerRepository extends JpaRepository<mate.domain.partner.PartnerDto, Integer> {
    @Query("SELECT ba.user.name as name, ba.user.nickname as nickname, ROUND((COUNT(*) / :size) * 100) AS percent " +
            "FROM BasicAnswer ba " +
            "WHERE ba.tag IN (:tag) " +
            "GROUP BY ba.user.idx " +
            "ORDER BY percent DESC")
    List<PartnerDto> findPartner(@Param("tag") List<String> tag, @Param("size") long size);
}
