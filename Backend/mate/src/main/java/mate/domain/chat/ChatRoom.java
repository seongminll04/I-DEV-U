package mate.domain.chat;

import lombok.Getter;
import mate.domain.user.User;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class ChatRoom {

    @Id @GeneratedValue
    private int idx;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "manager_idx")
//    private User user;
    private int userIdx;

    private String title;
    @Enumerated(EnumType.STRING)
    private ChatType type;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;




}
