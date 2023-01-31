package com.ssafy.marathon.service.user;


import com.ssafy.marathon.dto.request.user.SignInReqDto;
import com.ssafy.marathon.dto.request.user.UserReqDto;
import com.ssafy.marathon.dto.response.user.SignInResDto;
import com.ssafy.marathon.dto.response.user.SignUpResDto;
import java.util.List;

public interface SignService {
    SignUpResDto signUp(UserReqDto userDto);

    SignInResDto signIn(SignInReqDto signInRequestDto) throws RuntimeException;

    List<UserReqDto> getUsers();
    List<UserReqDto> getPatients();
    List<UserReqDto> getDoctors();
}
