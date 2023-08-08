package mate.chat.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    @Query("select distinct r from ChatRoom r join fetch r.chatRoomUsers where r.idx =:roomId")
    Optional<ChatRoom> findWithChatRoomUsersById(@Param("roomId") Long roomId);
}
