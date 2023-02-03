package com.ssafy.marathon.service.user;

import com.ssafy.marathon.config.security.JwtTokenProvider;
import com.ssafy.marathon.db.entity.user.User;
import com.ssafy.marathon.db.repository.UserRepository;
import com.ssafy.marathon.dto.request.user.SignInReqDto;
import com.ssafy.marathon.dto.response.user.SignInResDto;
import com.ssafy.marathon.service.patient.PatientSignServiceImpl;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserSignServiceImpl implements UserSignService {

    private final Logger LOGGER = LoggerFactory.getLogger(PatientSignServiceImpl.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;


    @Override
    public SignInResDto signIn(SignInReqDto signInRequestDto) {
        LOGGER.info("[signIn] signDataHandler 로 회원 정보 요청");
        User user = userRepository.getById(signInRequestDto.getId());
        LOGGER.info("[signIn] Id : {}", signInRequestDto.getId());

        SignInResDto signInResDto;

        LOGGER.info("[signIn] 패스워드 비교 수행"); //passwordEncoder를 통해 인코딩 안된값과 된 값을 비교
        if (!passwordEncoder.matches(signInRequestDto.getPassword(), user.getPassword())) {
            LOGGER.info("[signIn] 패스워드 불일치");
            signInResDto = SignInResDto.builder().success(false).msg("로그인 실패 : 패스워드 불일치").build();
            return signInResDto;
        }
        LOGGER.info("[signIn] 패스워드 일치");

        signInResDto = SignInResDto.builder().success(true).msg("로그인 성공").accessToken(
            jwtTokenProvider.createToken(user)).build();

        LOGGER.info("[signIn] SignInResDto 객체에 값 주입");

        return signInResDto;
    }

    @Override
    public void deleteUser(Long seq) {
        LOGGER.info("[deleteUser] 회원정보 삭제 시작");
        userRepository.deleteBySeq(seq);
        LOGGER.info("[deleteUser] 회원정보 삭제 완료");
    }

    @Override
    public void checkId(String id) {
        LOGGER.info("[checkId] 아이디 찾기 시작");
        User user =userRepository.getById(id);
        LOGGER.info("[checkId] 아이디 찾기 성공 id : {}", user.getId());
    }
}
