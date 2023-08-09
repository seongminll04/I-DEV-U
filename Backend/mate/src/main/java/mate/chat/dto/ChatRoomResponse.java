package mate.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mate.chat.domain.ChatParticipation;
import mate.chat.domain.ChatRoom;
import mate.chat.domain.Role;

import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoomResponse {

    private Integer roomIdx;

    private String title;

    private Boolean master;

    private Integer userCount;

    public static ChatRoomResponse from(ChatRoom chatRoom) {
        ChatRoomResponse response = new ChatRoomResponse();
        response.roomIdx = chatRoom.getIdx();
        response.title = chatRoom.getTitle();
        response.userCount = chatRoom.getUserCount();
        return response;
    }

    public static ChatRoomResponse of(ChatRoom chatRoom) {
        ChatRoomResponse response = new ChatRoomResponse();
        response.roomIdx = chatRoom.getIdx();
        response.title = chatRoom.getTitle();
        response.userCount = chatRoom.getUserCount();

        List<ChatParticipation> result = chatRoom.getChatRoomUsers().stream()
                .filter(chatRoomUser -> chatRoomUser.getRole() == Role.MASTER)
                .collect(Collectors.toList());

        response.master = result.size() == 0 ? false : true;
        return response;
    }

}
