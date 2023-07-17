package mate.repository;

import mate.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    // User 저장
    User save(User user);

    // User 삭제
    void delete(User user);

    // 모든 User 조회
    List<User> findAll();
}
