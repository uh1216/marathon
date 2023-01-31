package com.ssafy.marathon.controller.patient;

import com.ssafy.marathon.config.security.JwtTokenProvider;
import com.ssafy.marathon.dto.request.user.PatientReqDto;
import com.ssafy.marathon.dto.response.user.PatientResDto;
import com.ssafy.marathon.dto.response.user.SignUpResDto;
import com.ssafy.marathon.service.patient.PatientSignServiceImpl;
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

@RequestMapping("patient-sign")
@RestController
public class PatientSignController {
    private final PatientSignServiceImpl patientSignService;
    private final JwtTokenProvider jwtTokenProvider;

    private final Logger LOGGER = LoggerFactory.getLogger(PatientSignController.class);

    public PatientSignController(PatientSignServiceImpl patientSignService,
        JwtTokenProvider jwtTokenProvider) {
        this.patientSignService = patientSignService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody PatientReqDto patientReqDto) {
        LOGGER.info("[signUp] 회원가입 수행 id : {}, name : {}, role : patient", patientReqDto.getId(),
            patientReqDto.getName());
        SignUpResDto signUpResDto = patientSignService.signUp(patientReqDto);
        if(signUpResDto.isSuccess()) {
            LOGGER.info("[signUp] 회원가입 완료. id : {}", patientReqDto.getId());
            return new ResponseEntity<SignUpResDto>(signUpResDto, HttpStatus.CREATED);
        }
        LOGGER.info("[signUp] 회원가입 실패. id : {}", patientReqDto.getId());
        return new ResponseEntity<SignUpResDto>(signUpResDto, HttpStatus.INTERNAL_SERVER_ERROR);

    }

    @GetMapping("/modify")
    public ResponseEntity<?> loadInfo(HttpServletRequest request) {
        LOGGER.info("[loadInfo] patient-seq 추출 시작");
        Long seq = jwtTokenProvider.getUserSeq(jwtTokenProvider.resolveToken(request));
        LOGGER.info("[loadInfo] patient-seq 추출 완료");
        LOGGER.info("[loadInfo] 환자정보 로드 시작 ");
        PatientResDto patientResDto = patientSignService.getPatient(seq);
        LOGGER.info("[loadInfo] 환자정보 로드 완료 ");
        return new ResponseEntity<PatientResDto>(patientResDto, HttpStatus.OK);
    }
}
