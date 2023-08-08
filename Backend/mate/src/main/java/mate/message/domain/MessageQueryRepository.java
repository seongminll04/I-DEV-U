//package mate.message.domain;
//
//import com.querydsl.jpa.impl.JPAQueryFactory;
//import lombok.RequiredArgsConstructor;
//import mate.message.dto.MessageSearchRequest;
//import org.springframework.stereotype.Repository;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//@Repository
//@RequiredArgsConstructor
//public class MessageQueryRepository {
//
//    private final JPAQueryFactory queryFactory;
//
//    public List<ChatMessage> findByCondition(Long roomId, MessageSearchRequest request) {
//        return queryFactory
//                .selectFrom(message)
//                .where(
//                        message.roomId.eq(roomId),
//                        message.createdAt.before(LocalDateTime.parse(request.getLastMessageDate()))
//                )
//                .orderBy(message.id.desc())
//                .limit(request.getSize())
//                .fetch();
//    }
//}
