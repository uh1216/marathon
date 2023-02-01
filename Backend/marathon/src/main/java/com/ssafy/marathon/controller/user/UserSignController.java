package com.ssafy.marathon.controller.user;


import com.ssafy.marathon.dto.request.user.SignInReqDto;
import com.ssafy.marathon.dto.response.user.SignInResDto;
import com.ssafy.marathon.service.user.UserSignServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("user-sign")
@RestController
public class UserSignController {

    private final UserSignServiceImpl userSignService;

    private final Logger LOGGER = LoggerFactory.getLogger(UserSignController.class);

    public UserSignController(UserSignServiceImpl userSignService) {
        this.userSignService = userSignService;
    }

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
}
