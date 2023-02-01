package com.ssafy.marathon.controller.doctor;

import com.ssafy.marathon.config.security.JwtTokenProvider;
import com.ssafy.marathon.dto.request.user.DoctorReqDto;
import com.ssafy.marathon.dto.response.user.DoctorResDto;
import com.ssafy.marathon.dto.response.user.PatientResDto;
import com.ssafy.marathon.dto.response.user.SignUpResDto;
import com.ssafy.marathon.service.doctor.DoctorSignServiceImpl;
import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("doctor-sign")
@RestController
public class DoctorSignController {
    private final DoctorSignServiceImpl doctorSignService;
    private final JwtTokenProvider jwtTokenProvider;

    private final Logger LOGGER = LoggerFactory.getLogger(DoctorSignController.class);

    public DoctorSignController(DoctorSignServiceImpl doctorSignService,
        JwtTokenProvider jwtTokenProvider) {
        this.doctorSignService = doctorSignService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody DoctorReqDto doctorReqDto) {
        LOGGER.info("[signUp] 회원가입을 수행합니다. id : {}, name : {}, role : doctor", doctorReqDto.getId(),
            doctorReqDto.getName());
        SignUpResDto signUpResDto = doctorSignService.signUp(doctorReqDto);
        if(signUpResDto.isSuccess()) {
            LOGGER.info("[signUp] 회원가입을 완료했습니다. id : {}", doctorReqDto.getId());
            return new ResponseEntity<SignUpResDto>(signUpResDto, HttpStatus.CREATED);
        }
        LOGGER.info("[signUp] 회원가입을 실패했습니다. id : {}", doctorReqDto.getId());
        return new ResponseEntity<SignUpResDto>(signUpResDto, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/modify")
    public ResponseEntity<?> loadInfo(HttpServletRequest request) {
        LOGGER.info("[loadInfo] doctor-seq 추출 시작");
        Long seq = jwtTokenProvider.getUserSeq(jwtTokenProvider.resolveToken(request));
        LOGGER.info("[loadInfo] doctor-seq 추출 완료");
        LOGGER.info("[loadInfo] 의사정보 로드 시작 ");
        DoctorResDto doctorResDto = doctorSignService.getDoctor(seq);
        LOGGER.info("[loadInfo] 의사정보 로드 완료 ");
        return new ResponseEntity<DoctorResDto>(doctorResDto, HttpStatus.OK);
    }
}
