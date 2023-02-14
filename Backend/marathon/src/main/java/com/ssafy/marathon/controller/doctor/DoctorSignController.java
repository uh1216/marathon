package com.ssafy.marathon.controller.doctor;

import com.ssafy.marathon.config.security.JwtTokenProvider;
import com.ssafy.marathon.dto.request.user.DoctorReqDto;
import com.ssafy.marathon.dto.request.user.PatientReqDto;
import com.ssafy.marathon.dto.response.user.DoctorResDto;
import com.ssafy.marathon.dto.response.user.PatientResDto;
import com.ssafy.marathon.dto.response.user.SignUpResDto;
import com.ssafy.marathon.service.doctor.DoctorSignServiceImpl;
import java.util.HashMap;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("doctor-sign")
@RestController
@RequiredArgsConstructor
public class DoctorSignController {

    private final DoctorSignServiceImpl doctorSignService;
    private final JwtTokenProvider jwtTokenProvider;

    private final Logger LOGGER = LoggerFactory.getLogger(DoctorSignController.class);


    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody DoctorReqDto doctorReqDto) {
        LOGGER.info("[signUp] 회원가입을 수행합니다. id : {}, name : {}, role : doctor", doctorReqDto.getId(),
            doctorReqDto.getName());
        SignUpResDto signUpResDto = doctorSignService.signUp(doctorReqDto);
        if (signUpResDto.isSuccess()) {
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

    @PutMapping("/modify")
    public ResponseEntity<?> modifyDoctor(@RequestHeader("Access-Token") String accessToken, @RequestPart(name = "doctor") DoctorReqDto doctorReqDto, @RequestPart MultipartFile image)
        throws Exception {
        Long seq = jwtTokenProvider.getUserSeq(accessToken);
        LOGGER.info("[modifyDoctor] 의사정보 수정 시작 ");
        String token = doctorSignService.modifyDoctor(seq, doctorReqDto, image);
        HashMap<String, String> tokenMap = new HashMap<>();
        tokenMap.put("accessToken", token);
        LOGGER.info("[modifyPatient] 의사정보 수정 완료 ");
        return new ResponseEntity<HashMap<String, String>>(tokenMap, HttpStatus.CREATED);
    }

    @PutMapping("/modify-noimg")
    public ResponseEntity<?> modifyDoctor2(@RequestHeader("Access-Token") String accessToken, @RequestBody DoctorReqDto doctorReqDto)
        throws Exception {
        Long seq = jwtTokenProvider.getUserSeq(accessToken);
        LOGGER.info("[modifyDoctor] 의사정보 수정 시작 ");
        String token = doctorSignService.modifyDoctor(seq, doctorReqDto);
        HashMap<String, String> tokenMap = new HashMap<>();
        tokenMap.put("accessToken", token);
        LOGGER.info("[modifyPatient] 의사정보 수정 완료 ");
        return new ResponseEntity<HashMap<String, String>>(tokenMap, HttpStatus.CREATED);
    }
}
