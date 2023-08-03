package mate.repository;

import mate.domain.user.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    List<Notification> findByContentContainingOrderByIdxDesc(String keyWord);

    List<Notification> findByCheckedOrderByIdxDesc(String read);
}
