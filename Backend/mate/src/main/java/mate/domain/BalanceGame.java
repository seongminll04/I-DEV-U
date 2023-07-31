package mate.domain;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
public class BalanceGame {

    @Id @GeneratedValue
    private int idx;
    private String title;
    private String choice1;
    private String choice2;
}
