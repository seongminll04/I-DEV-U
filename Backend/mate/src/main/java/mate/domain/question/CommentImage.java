package mate.domain.question;


import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class CommentImage {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_idx")
    private QuestionBoardComment questionBoardComment;

    private String imageUrl;
}
