package com.ssafy.marathon.controller.user;


import com.ssafy.marathon.config.security.JwtTokenProvider;
import com.ssafy.marathon.dto.request.user.IdEmailDto;
import com.ssafy.marathon.dto.request.user.SignInReqDto;
import com.ssafy.marathon.dto.response.user.SignInResDto;
import com.ssafy.marathon.service.user.EmailServiceImpl;
import com.ssafy.marathon.service.user.UserSignServiceImpl;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.event.PublicInvocationEvent;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("user-sign")
@RestController
@RequiredArgsConstructor
public class UserSignController {

    private final UserSignServiceImpl userSignService;
    private final JwtTokenProvider jwtTokenProvider;
    private final EmailServiceImpl emailService;
    private final Logger LOGGER = LoggerFactory.getLogger(UserSignController.class);

    @PostMapping(value = "/login")
    public ResponseEntity<?> signIn(@RequestBody SignInReqDto signInRequestDto) {
        LOGGER.info("[signIn] 로그인을 시도하고 있습니다. id : {}, pw : ****", signInRequestDto.getId());
        SignInResDto signInResultDto = userSignService.signIn(signInRequestDto);

        if (signInResultDto.isSuccess()) {
            LOGGER.info("[signIn] 정상적으로 로그인되었습니다. id : {}, token : {}", signInRequestDto.getId(),
                signInResultDto.getAccessToken());
            return new ResponseEntity<SignInResDto>(signInResultDto, HttpStatus.OK);
        }
        return new ResponseEntity<SignInResDto>(signInResultDto, HttpStatus.UNAUTHORIZED);
    }

    @DeleteMapping("/withdraw")
    public ResponseEntity<?> withdraw(@RequestHeader("Access-Token") String accessToken) {
        Long seq = jwtTokenProvider.getUserSeq(accessToken);
        LOGGER.info("[withdraw] 환자정보 삭제 시작 ");
        userSignService.deleteUser(seq);
        LOGGER.info("[withdraw] 환자정보 삭제 완료 ");
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @GetMapping("/findid")
    public ResponseEntity<?> findId(@RequestParam String email) {
        LOGGER.info("[findId] 이이디 찾기 시작 ");
        try {
            emailService.sendEmailToFindId(email);
        } catch (Exception e) {
            LOGGER.info("[withdraw] 아이디 찾기 실패 ");
            e.printStackTrace();
            String msg = "해당 이메일이 존재하지 않습니다.";
            return new ResponseEntity<String>(msg, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        LOGGER.info("[withdraw] 아이디 찾기 수행 완료 ");
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @PutMapping("/findpw")
    public ResponseEntity<?> findPw(@RequestBody IdEmailDto idEmailDto) {
        LOGGER.info("[withdraw] 패스워드 찾기 시작 ");
        try {
            emailService.sendEmailToFindPassword(idEmailDto);
        } catch (Exception e) {
            LOGGER.info("[withdraw] 패스워드 찾기 실패 ");
            e.printStackTrace();
            String msg = "해당 이메일이 존재하지 않습니다.";
            return new ResponseEntity<String>(msg, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        LOGGER.info("[withdraw] 패스워드 찾기 수행완료 ");
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @GetMapping("/checkid/{id}")
    public ResponseEntity<?> checkId(@PathVariable String id) {
        userSignService.checkId(id);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
