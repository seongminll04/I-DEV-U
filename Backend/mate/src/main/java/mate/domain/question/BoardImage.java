package mate.domain.question;


import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class BoardImage {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_idx")
    private QuestionBoard questionBoard;

    private String imageUrl;

}
