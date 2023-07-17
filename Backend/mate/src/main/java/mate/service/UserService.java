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

    public List<User> idcheck(String id) {
        return userRepository.findById(id);
    }

    public List<User> nickcheck(String nickname) {
        return userRepository.findByNickname(nickname);
    }

    public void delete(User user) {
        userRepository.delete(user);
    }
}
