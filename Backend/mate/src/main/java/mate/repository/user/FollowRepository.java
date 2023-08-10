package mate.repository.user;

import mate.domain.user.Follow;
import mate.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Integer> {

    Optional<List<Follow>> findByUserIdx(Integer userIdx);

    @Transactional
    @Modifying
    @Query("delete from Follow f where f.user.idx = :idx and f.followUser.idx = :follow")
    void deleteByIdxAndFollow(@Param("idx") Integer idx, @Param("follow") Integer follow);

    boolean existsByUserAndFollowUser(User user, User followUser);

}
