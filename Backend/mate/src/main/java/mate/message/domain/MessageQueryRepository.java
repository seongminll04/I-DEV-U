package mate.message.domain;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import mate.message.dto.MessagePageDto;
import org.springframework.stereotype.Repository;

import java.util.List;
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

    public List<ChatMessage> findTotalMessage(Integer roomIdx, MessagePageDto messagePageDto){

        QChatMessage chatMessage = QChatMessage.chatMessage;
        return queryFactory
                .selectFrom(chatMessage)
                .where(
                        chatMessage.roomIdx.eq(roomIdx),
                        chatMessage.idx.lt(messagePageDto.getMessageIdx())
                )
                .orderBy(chatMessage.idx.desc()) // messageIdx를 기준으로 내림차순 정렬
                .limit(messagePageDto.getSize()) // 가져올 메시지 개수 제한
                .fetch(); // 쿼리 실행 및 결과 반환)
    }
}
