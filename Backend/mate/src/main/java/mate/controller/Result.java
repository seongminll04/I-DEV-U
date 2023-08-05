package mate.controller;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.http.ResponseEntity;

import java.util.Map;

@Data
@AllArgsConstructor
@Builder
public
class Result<T> {
    private T data;
    private T status;
}
