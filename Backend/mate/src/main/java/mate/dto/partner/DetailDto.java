package mate.dto.partner;

import lombok.Data;

import java.util.List;

@Data
public class DetailDto {
	private int userIdx;
	private String name;
	private String nickname;
	private String intro;
	private List<String> techList;
}
