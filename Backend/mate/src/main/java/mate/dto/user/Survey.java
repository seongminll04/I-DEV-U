package mate.dto.user;

import lombok.Data;

import java.util.List;

@Data
public class Survey {
    private Integer surveyIdx;
    private List<String> tagList;
}
