package com.ssafy.marathon.service.user;


import com.ssafy.marathon.dto.request.user.SignInReqDto;
import com.ssafy.marathon.dto.request.user.UserReqDto;
import com.ssafy.marathon.dto.response.user.SignInResDto;
import com.ssafy.marathon.dto.response.user.UserResDto;
import java.util.List;

public interface UserSignService {

    SignInResDto signIn(SignInReqDto signInRequestDto);


}
