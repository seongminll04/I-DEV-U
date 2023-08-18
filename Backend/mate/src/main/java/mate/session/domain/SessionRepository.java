package mate.session.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface SessionRepository extends JpaRepository<Session, Integer> {

    @Modifying
    @Transactional
    @Query("delete from Session s where s.userIdx in :userIdx")
    void deleteByIdx(@Param("userIdx") Integer userIdx);

    @Query("select distinct s from Session s where s.userIdx in :userIdx")
    List<Session> findByUser(@Param("userIdx") List<Integer> userIdx);

    @Query("select distinct s from Session s")
    Optional<List<Session>> userList();

}
