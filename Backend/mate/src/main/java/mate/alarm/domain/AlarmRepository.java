package mate.alarm.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.util.List;
import java.util.Optional;

public interface AlarmRepository extends JpaRepository<Alarm, Integer> {

    @Query("select a from Alarm a where a.toIdx = :userIdx")
    Optional<List<Alarm>> findFrom (@Param("userIdx") Integer userIdx);

    @Query("select a from Alarm a where a.fromIdx = :userIdx")
    Optional<List<Alarm>> findTo (@Param("userIdx") Integer userIdx);


    @Modifying
    @Query("delete from Alarm a where a.idx = :idx")
    void deleteByIdx(@Param("idx") Integer idx);

}
