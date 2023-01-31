package com.ssafy.marathon.service.user;

import com.ssafy.marathon.dto.request.user.SignInReqDto;
import com.ssafy.marathon.dto.request.user.UserReqDto;
import com.ssafy.marathon.dto.response.user.SignInResDto;
import com.ssafy.marathon.dto.response.user.SignUpResDto;
import java.util.List;

public class SignServiceImpl implements SignService {

    @Override
    public SignUpResDto signUp(UserReqDto userDto) {
        return null;
    }

    @Override
    public SignInResDto signIn(SignInReqDto signInRequestDto) throws RuntimeException {
        return null;
    }

    @Override
    public List<UserReqDto> getUsers() {
        return null;
    }

    @Override
    public List<UserReqDto> getPatients() {
        return null;
    }

    @Override
    public List<UserReqDto> getDoctors() {
        return null;
    }
}
