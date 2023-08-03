package mate.controller;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@AllArgsConstructor
@Builder
class Result<T> {
    private T data;
    private T status;
}
