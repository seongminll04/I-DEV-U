package mate.repository.user;

import mate.domain.basic.BasicAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface BasicRepository extends JpaRepository<BasicAnswer, Integer> {
    @Query("select b from BasicAnswer b where b.user.idx = :idx")
    List<BasicAnswer> findByUser(@Param("idx") Integer idx);

    @Modifying
    @Transactional
    @Query("delete from BasicAnswer b where b.user.idx = :idx")
    void deleteAllByUserId(@Param("idx") Integer idx);
}
