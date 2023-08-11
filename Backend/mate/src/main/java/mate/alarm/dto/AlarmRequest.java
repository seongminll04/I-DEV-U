package mate.alarm.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.Data;
import mate.alarm.domain.AlarmType;

import java.time.LocalDateTime;

@Data
public class AlarmRequest{

    private Integer fromIdx;
    private Integer toIdx;

    private AlarmType type;

    private LocalDateTime createdAt;


}
