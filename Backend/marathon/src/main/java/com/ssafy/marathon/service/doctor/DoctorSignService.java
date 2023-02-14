package com.ssafy.marathon.service.doctor;

import com.ssafy.marathon.dto.request.user.DoctorReqDto;
import com.ssafy.marathon.dto.request.user.PatientReqDto;
import com.ssafy.marathon.dto.request.user.SignInReqDto;
import com.ssafy.marathon.dto.request.user.UserReqDto;
import com.ssafy.marathon.dto.response.user.DoctorResDto;
import com.ssafy.marathon.dto.response.user.PatientResDto;
import com.ssafy.marathon.dto.response.user.SignInResDto;
import com.ssafy.marathon.dto.response.user.SignUpResDto;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface DoctorSignService {
    SignUpResDto signUp(DoctorReqDto patientReqDto);

    DoctorResDto getDoctor(Long seq);

    String modifyDoctor(Long seq, DoctorReqDto doctorReqDto, MultipartFile file)
        throws Exception;
    String modifyDoctor(Long seq, DoctorReqDto doctorReqDto)
        throws Exception;
}
