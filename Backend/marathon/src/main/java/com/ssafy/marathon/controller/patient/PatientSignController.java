package com.ssafy.marathon.controller.patient;

import com.ssafy.marathon.dto.request.user.PatientReqDto;
import com.ssafy.marathon.dto.response.user.SignUpResDto;
import com.ssafy.marathon.service.patient.PatientSignServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("patient-sign")
@RestController
public class PatientSignController {
    private final PatientSignServiceImpl patientSignService;

    private final Logger LOGGER = LoggerFactory.getLogger(PatientSignController.class);

    public PatientSignController(PatientSignServiceImpl patientSignService) {
        this.patientSignService = patientSignService;
    }
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody PatientReqDto patientReqDto) {
        LOGGER.info("[signUp] 회원가입을 수행합니다. id : {}, name : {}, role : patient", patientReqDto.getId(),
            patientReqDto.getName());
        SignUpResDto signUpResDto = patientSignService.signUp(patientReqDto);
        if(signUpResDto.isSuccess()) {
            LOGGER.info("[signUp] 회원가입을 완료했습니다. id : {}", patientReqDto.getId());
            return new ResponseEntity<SignUpResDto>(signUpResDto, HttpStatus.CREATED);
        }
        LOGGER.info("[signUp] 회원가입을 실패했습니다. id : {}", patientReqDto.getId());
        return new ResponseEntity<SignUpResDto>(signUpResDto, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
