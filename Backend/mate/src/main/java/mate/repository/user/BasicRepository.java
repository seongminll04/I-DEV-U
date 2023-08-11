package mate.repository.user;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import mate.domain.basic.BasicAnswer;

@Repository
public interface BasicRepository extends JpaRepository<BasicAnswer, Integer> {
	@Query("select b from BasicAnswer b where b.user.idx = :idx")
	List<BasicAnswer> findByUser(@Param("idx") Integer idx);

	@Modifying
	@Transactional
	@Query("delete from BasicAnswer b where b.user.idx = :idx")
	void deleteAllByUserId(@Param("idx") Integer idx);

	@Query("select b.tag from BasicAnswer b where b.user.idx = :userIdx and b.surveyIdx = 3")
	List<String> findLanguage(@Param("userIdx") Integer userIdx);

	@Query("select b.tag from BasicAnswer b where b.user.idx = :userIdx and b.surveyIdx = 2")
	String findWork(@Param("userIdx") int userIdx);

	@Query("select b.tag from BasicAnswer b where b.user.idx = :userIdx and b.surveyIdx = 4")
	String findLocation(@Param("userIdx") int userIdx);

	@Query("select b.tag from BasicAnswer b where b.user.idx = :userIdx and b.surveyIdx = 1")
	String findJob(@Param("userIdx") int userIdx);

}
