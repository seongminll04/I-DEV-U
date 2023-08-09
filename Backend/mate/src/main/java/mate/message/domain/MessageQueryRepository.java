package mate.message.domain;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
@RequiredArgsConstructor
public class MessageQueryRepository {

    private final JPAQueryFactory queryFactory;

    public Optional<ChatMessage> findLastMessage(Integer roomIdx) {

        QChatMessage chatMessage = QChatMessage.chatMessage; // QueryDSL의 Q클래스 사용
        return Optional.ofNullable(queryFactory
                .selectFrom(chatMessage)
                .where(chatMessage.roomIdx.eq(roomIdx))
                .orderBy(chatMessage.createdAt.desc())
                .fetchFirst()); // 조회 결과 중 첫 번째 데이터 반환
    }
}
