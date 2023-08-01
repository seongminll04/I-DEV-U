package mate.domain.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
//    ADMIN, USER
    ADMIN("ROLE_ADMIN"), USER("ROLE_USER");
    private final String key;

}
