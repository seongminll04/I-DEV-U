package mate.chat.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatParticipationRepository extends JpaRepository<ChatParticipation, Integer> {

    @Query("select p from ChatParticipation p where p.chatRoom.idx = : roomIdx")
    List<ChatParticipation> findUser(@Param("roomIdx") Integer roomIdx);


}
