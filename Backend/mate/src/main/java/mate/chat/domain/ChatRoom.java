package mate.chat.domain;


import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mate.chat.dto.ChatRoomCreateRequest;
import mate.chat.dto.ChatRoomUpdateRequest;
import mate.domain.user.User;
import mate.global.exception.DuplicateException;
import mate.global.exception.ExistException;
import mate.global.exception.NotFoundException;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idx;

    private String title;

    @Enumerated(EnumType.STRING)
    private ChatRoomStatus type;

    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;

    private int userCount;

    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChatParticipation> chatRoomUsers = new ArrayList<>();

    public static ChatRoom createChatRoom(ChatRoomCreateRequest chatRoomCreateRequest, User user) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.title = chatRoomCreateRequest.getTitle();
        chatRoom.type = ChatRoomStatus.LACK;
        chatRoom.createdAt = chatRoomCreateRequest.getCreatedAt();
        chatRoom.updatedAt = chatRoomCreateRequest.getCreatedAt();
        chatRoom.chatRoomUsers.add(ChatParticipation.createChatRoomUser(Role.MASTER, user, chatRoom));
        chatRoom.userCount++;
        return chatRoom;
    }
    public void update(ChatRoomUpdateRequest chatRoomUpdateRequest){
        this.title = chatRoomUpdateRequest.getTitle();
        this.updatedAt = chatRoomUpdateRequest.getUpdatedAt();
    }

    public void updateTime(LocalDateTime updatedAt){
        this.updatedAt = updatedAt;
    }

    public boolean isMaster(Integer userIdx) {
        List<ChatParticipation> result = this.chatRoomUsers.stream()
                .filter(chatRoomUser -> chatRoomUser.getUser().getIdx().equals(userIdx))
                .collect(Collectors.toList());

        return result.size() == 1 && result.get(0).getRole() == Role.MASTER;
    }

    public void addChatRoomUser(User user, LocalDateTime updatedAt) {

//        if (chatRoomUsers.size() == LIMIT) {
//            throw new NotEnoughException("채팅방 인원이 다차서 입장하실 수 없습니다.");
//        }

        List<ChatParticipation> result = chatRoomUsers.stream()
                .filter(chatRoomUser -> chatRoomUser.getUser().getIdx().equals(user.getIdx()))
                .collect(Collectors.toList());

        if (result.size() > 0) {
            throw new DuplicateException("이미 참가한 채팅방입니다.");
        }
        this.updatedAt = updatedAt;
        chatRoomUsers.add(ChatParticipation.createChatRoomUser(Role.USER, user, this));
        this.userCount++;
//        this.type = chatRoomUsers.size() == LIMIT ? ChatRoomStatus.FULL : ChatRoomStatus.LACK;
        this.type = ChatRoomStatus.LACK;
    }

    public void deleteChatRoomUser(User user) {
        List<ChatParticipation> result = chatRoomUsers.stream()
                .filter(chatRoomUser -> chatRoomUser.getUser().getIdx().equals(user.getIdx()))
                .collect(Collectors.toList());

        if (result.size() == 0) {
            throw new NotFoundException("존재하지 않는 참가자입니다.");
        }

        if(result.get(0).getRole() == Role.MASTER) {
            throw new ExistException("채팅방 생성자는 채팅방을 나갈 수 없습니다.");
        }

        chatRoomUsers.remove(result.get(0));
        this.userCount--;
//        if (chatRoomUsers.size() < LIMIT) {
//            this.status = ChatRoomStatus.LACK;
//        }
    }


}
