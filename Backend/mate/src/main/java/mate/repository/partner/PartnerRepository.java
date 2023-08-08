package mate.repository.partner;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import mate.domain.partner.Partner;

@Repository
public interface PartnerRepository extends JpaRepository<Partner, Integer> {
	@Query(
		"SELECT ba.user.name as name, ba.user.nickname as nickname, ROUND((COUNT(*) / :size) * 100) AS percent "
			+
			"FROM BasicAnswer ba " +
			"WHERE ba.tag IN (:tag) " +
			"GROUP BY ba.user.idx " +
			"ORDER BY percent DESC")
	List<Object> listPartner(@Param("tag") List<String> tag, @Param("size") long size);

	@Query("SELECT ba.user.idx as user, ba.tag "
		+ "FROM BasicAnswer as ba "
		+ "WHERE ba.user.idx = :userIdx AND ba.surveyIdx = 3"
		+ "GROUP BY ba.user.idx, ba.tag")
	List<Object> findTech(@Param("userIdx") int userIdx);
}
