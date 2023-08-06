package mate.global.login.service;

import lombok.RequiredArgsConstructor;
import mate.domain.user.User;
import mate.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("해당 이메일이 존재하지 않습니다."));
//        if (email.startsWith("kakao_")){
//            return org.springframework.security.core.userdetails.User.builder()
//                    .username(user.getEmail())
//                    .password("{bcrypt}$2a$10$wmgS0SQ1k48fYvqD8XSjRuON1lXGuPD3uifFPXssLgFAmEQUTjQam")
//                    .roles(user.getRole().name())
//                    .build();
//        }
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRole().name())
                .build();
    }
}
