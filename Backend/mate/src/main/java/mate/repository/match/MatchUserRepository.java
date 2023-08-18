package mate.repository.match;

import mate.domain.match.MatchUser;
import mate.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MatchUserRepository extends JpaRepository<MatchUser, Integer> {
    Optional<MatchUser> findByUser(User user);

    void deleteMatchUserByUser(User user);

}
