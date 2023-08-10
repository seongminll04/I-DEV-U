package mate.dto.match;

import lombok.Data;

import java.util.List;

@Data
public class MatchDto {
    private String name;
    private String nickname;
    private String face;
    private int age;
    private long percent;
}
