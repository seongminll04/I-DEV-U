package mate.repository.match;

import mate.domain.match.MatchUser;
import mate.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MatchUserRepository extends JpaRepository<MatchUser, Integer> {

    void deleteMatchUserByUser(User user);

}
