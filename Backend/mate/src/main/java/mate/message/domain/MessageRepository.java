package mate.message.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface MessageRepository extends JpaRepository<ChatMessage, Integer> {

    @Query("SELECT m FROM ChatMessage m " +
            "WHERE m.roomIdx = :roomIdx " +
            "ORDER BY m.idx DESC")
    List<ChatMessage> findByMessage(
            @Param("roomIdx") Integer roomIdx
    );

}
