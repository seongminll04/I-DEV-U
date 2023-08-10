package mate.service;

import lombok.RequiredArgsConstructor;
import mate.domain.user.Notification;
import mate.repository.NotificationRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public void writeNotification(Notification notification) {
        notificationRepository.save(notification);
    }

    public Notification detailNotification(int notificationIdx) {
        Optional<Notification> notification = notificationRepository.findById(notificationIdx);

        return notification.get();
    }

    public void modifyNotification(Notification notification) {
        notificationRepository.save(notification);
    }

    public void deleteNotification(int notificationIdx) {
        notificationRepository.deleteById(notificationIdx);
    }

    public List<Notification> getNotificationAll(){
        return notificationRepository.findAll(Sort.by(Sort.Direction.DESC, "idx"));
    }

//    public List<Notification> findNotificationByContent(String keyWord) {
//        return notificationRepository.findByContentContainingOrderByIdxDesc(keyWord);
//    }

    public List<Notification> findUncheckedNotification() {
        return notificationRepository.findByCheckedOrderByIdxDesc("UNREAD");
    }

    public List<Notification> findTop4UncheckedNotification(int userIdx) {
        return notificationRepository.findTop4ByUserIdxAndCheckedOrderByIdxDesc(userIdx, "UNREAD");
    }

    public List<Notification> findByUserIdxAndChecked(int userIdx) {
        return notificationRepository.findByUserIdxAndCheckedOrderByIdxDesc(userIdx, "UNREAD");
    }
}
