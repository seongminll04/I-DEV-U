package mate.repository.user;

import mate.domain.basic.BasicAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BasicRepository extends JpaRepository<BasicAnswer, Integer> {
    Optional<BasicAnswer> findByUser(Integer userIdx);
}
