package mate.chat.domain;

import mate.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface ChatRoomRepository extends JpaRepository<ChatRoom, Integer> {

    @Query("select distinct r from ChatRoom r join fetch r.chatRoomUsers where r.idx =:roomIdx")
    Optional<ChatRoom> findWithChatRoomUsersByIdx(@Param("roomIdx") Integer roomIdx);

    @Query("select distinct cr from ChatRoom cr "+
            "join fetch cr.chatRoomUsers cru " +
            "where cru.user = :user " +
            "order by cr.updatedAt desc ")
    List<ChatRoom> findWithUser(@Param("user") User user);

    Optional<ChatRoom> findByIdx(Integer Idx);

    @Query("select distinct r from ChatRoom r join fetch r.chatRoomUsers order by r.updatedAt desc ")
    List<ChatRoom> findAll();


    @Query("select distinct r from ChatRoom r " +
            "join fetch r.chatRoomUsers u1 " +
            "join fetch r.chatRoomUsers u2 " +
            "where (u1.idx = :fromIdx and u2.idx = :toIdx) " +
            "   or (u1.idx = :toIdx and u2.idx = :fromIdx) " +
            "   and r.userCount = 2")
    List<ChatRoom> findChatRoomByTwo(@Param("fromIdx") Integer fromIdx, @Param("toIdx") Integer toIdx);

}
