package mate.repository.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import mate.domain.user.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	Optional<User> findByEmail(String email);

	Optional<User> findByNickname(String nickname);

	Optional<User> findByRefreshToken(String refreshToken);

	Optional<User> findByIdx(Integer idx);

	Optional<User> findByEmailAndName(String email, String name);

	@Query("select u from User u where u.idx != :idx and u.email = :email")
	Optional<User> findUserByEmailAndNotIdx(@Param("idx") Integer userIdx, @Param("email") String email);

	@Query("select u from User u where u.idx != :idx and u.nickname = :nickname")
	Optional<User> findUserByNicknameAndNotIdx(@Param("idx") Integer userIdx, @Param("nickname") String nickname);

	@Modifying
	@Transactional
	void deleteByIdx(Integer idx);

}