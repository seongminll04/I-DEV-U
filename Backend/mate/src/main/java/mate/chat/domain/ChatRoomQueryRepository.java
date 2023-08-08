package mate.chat.domain;

import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
import mate.domain.user.User;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
@RequiredArgsConstructor
public class ChatRoomQueryRepository {

    private final JPAQueryFactory queryFactory;


//    public List<ChatRoom> findByUser(User user) {
//        return queryFactory
//                .selectFrom(chatRoom).distinct()
//                .join(chatRoom.chatRoomUsers, chatRoomUser).fetchJoin()
//                .where(
//                        chatRoomUser.user.eq(user),
//                        chatRoom.delYn.eq(YN.N)
//                )
//                .orderBy(chatRoom.id.desc())
//                .fetch();
//    }
}
