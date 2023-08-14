package mate.inquiry.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface InquiryRepository extends JpaRepository<Inquiry, Integer> {


    @Query("select distinct i from Inquiry i")
    List<Inquiry> findList();

    @Query("select i from Inquiry i where i.idx = :idx")
    Optional<Inquiry> findDetail(@Param("idx") Integer idx);

    @Modifying
    @Query("delete from Inquiry i where i.idx = :idx")
    void deleteByIdx(@Param("idx") Integer idx);


}
