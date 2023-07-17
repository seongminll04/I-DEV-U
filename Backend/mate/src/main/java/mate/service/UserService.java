package mate.service;

import mate.domain.User;
import mate.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void save(User user) {
        userRepository.save(user);
    }

    public List<User> emailcheck(String email) {
        return userRepository.findByEmail(email);
    }

    public List<User> nickcheck(String nickname) {
        return userRepository.findByNickname(nickname);
    }

    public User login(String email, String pw) {
        return userRepository.findByEmailAndPw(email, pw);
    }

    public void delete(User user) {
        userRepository.delete(user);
    }
}