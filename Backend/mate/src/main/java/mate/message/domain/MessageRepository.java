package mate.message.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface MessageRepository extends JpaRepository<ChatMessage, Integer> {

    @Query("select m from ChatMessage m " +
            "where m.roomIdx = :roomIdx " +
            "order by m.createdAt desc")
    List<ChatMessage> findByMessage(
            @Param("roomIdx") Integer roomIdx
    );

}
