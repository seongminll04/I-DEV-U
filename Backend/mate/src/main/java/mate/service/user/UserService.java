package mate.service.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mate.controller.Result;
import mate.domain.user.Follow;
import mate.domain.user.Role;
import mate.domain.user.User;
import mate.domain.user.UserStatus;
import mate.dto.user.*;
import mate.repository.user.FollowRepository;
import mate.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.IdentityHashMap;
import java.util.Map;
import java.util.Optional;

import static org.springframework.http.ResponseEntity.badRequest;
import static org.springframework.http.ResponseEntity.ok;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final FollowRepository followRepository;

    @Value("${custom.path.upload-images}")
    private String uploadDir;

    @Value("${custom_path_load-images}")
    private String loadDir;


    public void signUp(UserSignUpDto userSignUpDto) throws Exception {

        if (userRepository.findByEmail(userSignUpDto.getEmail()).isPresent()) {
            throw new Exception("이미 존재하는 이메일입니다.");
        }

        if (userRepository.findByNickname(userSignUpDto.getNickname()).isPresent()) {
            throw new Exception("이미 존재하는 닉네임입니다.");
        }

        User user = User.builder()
                .email(userSignUpDto.getEmail())
                .password(userSignUpDto.getPassword())
                .name(userSignUpDto.getName())
                .nickname(userSignUpDto.getNickname())
                .birth(userSignUpDto.getBirthday())
                .gender(userSignUpDto.getGender())
                .status(UserStatus.A)
                .role(Role.USER)
                .build();

        if (userSignUpDto.getEmail().startsWith("kakao_")) user.setKakao();

        user.passwordEncode(passwordEncoder);
        userRepository.save(user);

    }
    public Result update(UserUpdateDto userUpdateDto) throws Exception {
        if (userRepository.findUserByEmailAndNotIdx(userUpdateDto.getUserIdx(), userUpdateDto.getEmail()).isPresent()) {
            throw new Exception("이미 존재하는 이메일입니다.");
        }

        if (userRepository.findUserByNicknameAndNotIdx(userUpdateDto.getUserIdx(), userUpdateDto.getNickname()).isPresent()) {
            throw new Exception("이미 존재하는 닉네임입니다.");
        }
        System.out.println(userUpdateDto);
        return userRepository.findByIdx(userUpdateDto.getUserIdx()).map(user -> {
            user = user.builder().idx(userUpdateDto.getUserIdx())
                    .email(userUpdateDto.getEmail())
                    .name(userUpdateDto.getName())
                    .nickname(userUpdateDto.getNickname())
                    .birth(userUpdateDto.getBirth())
                    .gender(userUpdateDto.getGender())
                    .password(user.getPassword())
                    .intro(Optional.ofNullable(userUpdateDto.getIntro()).orElse(user.getIntro()))
                    .role(user.getRole())
                    .status(user.getStatus())
                    .originalFileName(user.getOriginalFileName())
                    .storedFileName(user.getStoredFileName())
                    .build();

            userRepository.save(user);

            return Result.builder().status(ok().body("유저 수정 성공")).build();
        }).orElse(Result.builder().status(badRequest().body("유저 수정 실패")).build());

    }

    public Result check(UserCheckDto userCheckDto){

        User user = userRepository.findByIdx(userCheckDto.getUserIdx())
                .orElseThrow(() -> new UsernameNotFoundException("해당 화원이 존재하지 않습니다."));
        if (user.getEmail().startsWith("kakao_")) userCheckDto.setPassword("kakao");
        System.out.println(userCheckDto.getPassword());
        System.out.println(user.getPassword());
        if (passwordEncoder.matches(userCheckDto.getPassword(), user.getPassword())){
            return Result.builder().status(ok().body("비밀번호 일치")).build();
        }
       return Result.builder().status(badRequest().body("비밀번호 불일치")).build();

    }

    public Result changePw(UserCheckDto userCheckDto){
        return userRepository.findByIdx(userCheckDto.getUserIdx())
                .map(user -> {
                    user.setPw(userCheckDto.getPassword());
                    user.passwordEncode(passwordEncoder);
                    return Result.builder().status(ok().body("비밀번호 변경 성공")).build();
                }).orElse(Result.builder().status(badRequest().body("비밀번호 변경 실패")).build());
    }

    public Result follow(UserFollowDto userFollowDto){

        User user = userRepository.findByIdx(userFollowDto.getUserIdx())
                .orElseThrow(() -> new UsernameNotFoundException("해당 화원이 존재하지 않습니다."));
        User followUser = userRepository.findByIdx(userFollowDto.getFollowIdx())
                .orElseThrow(() -> new UsernameNotFoundException("해당 화원이 존재하지 않습니다."));

        // 중복 체크
        if (followRepository.existsByUserAndFollowUser(user, followUser)) {
            return Result.builder().status(badRequest().body("이미 팔로우한 사용자입니다.")).build();
        }

        Follow follow = Follow.builder()
                .user(user)
                .followUser(followUser)
                .build();
        followRepository.save(follow);

        return Result.builder().status(ok().body("팔로우 성공")).build();
    }

    public Result unfollow(UserFollowDto userFollowDto){
        followRepository.deleteByIdxAndFollow(userFollowDto.getUserIdx(), userFollowDto.getFollowIdx());
        return Result.builder().status(ok().body("언팔로우 성공")).build();
    }


    public Result uploadFile(MultipartFile multipartFile, Integer userIdx) throws IOException {

        // 파일이 첨부되지 않은 경우
        if (multipartFile == null) throw new IllegalArgumentException("파일이 첨부되지 않았습니다.");
        // 확장자명이 존재하지 않을 경우 에러
        validateContentType(multipartFile);

        File directory = new File(uploadDir);
        if (!directory.exists()) {
            boolean mkdirsResult = directory.mkdirs();
            if (mkdirsResult) {
                System.out.println("디렉토리 생성 성공");
            } else {
                System.out.println("디렉토리 생성 실패");
            }
        }


        User user = userRepository.findByIdx(userIdx)
                .orElseThrow(() -> new UsernameNotFoundException("해당 화원이 존재하지 않습니다."));

        if (user.getStoredFileName() != null){
            File originalFilePath = new File(user.getStoredFileName());
            if (originalFilePath.exists()){
                if(!originalFilePath.delete()) log.error("기존에 설정된 프로필 사진 삭제에 실패했습니다.");
            }
        }

        String fileName = user.getIdx() + "_";
        String loadPath = loadDir  + fileName;
        String filePath = uploadDir + fileName;

        Map<String, String> map = new IdentityHashMap<>();
        map.put("fileName", multipartFile.getOriginalFilename());
        map.put("loadPath", loadPath);

        File file = new File(filePath);
        multipartFile.transferTo(file);

        user.uploadFile(fileName, filePath);
        return Result.builder().status(ok().body("업로드 성공")).data(map).build();
    }

    private void validateContentType(MultipartFile multipartFile) {
        // 파일의 확장자 추출
        String contentType = multipartFile.getContentType();

        if(ObjectUtils.isEmpty(contentType)) {
            throw new IllegalArgumentException("사진 파일만 업로드해주세요.");
        }
        // 확장자가 jpeg, png인 파일들만 받아서 처리
        else if(!contentType.contains("image/jpeg") && !contentType.contains("image/png")) {

            throw new IllegalArgumentException("사진 파일만 업로드해주세요.");
        }
    }


}