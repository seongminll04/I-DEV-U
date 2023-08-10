package mate.repository.match;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import mate.domain.match.MatchAnswer;

@Repository
public interface MatchRepository extends JpaRepository<MatchAnswer, Integer> {
	@Query("select m from MatchAnswer m where m.user.idx = :userIdx")
	List<MatchAnswer> findByUser(@Param("userIdx") Integer userIdx);

	@Modifying
	@Transactional
	@Query("delete from MatchAnswer m where m.user.idx = :userIdx")
	void deleteAllByUserId(@Param("userIdx") Integer userIdx);
}
