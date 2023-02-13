package com.ssafy.marathon.controller.admin;

import com.ssafy.marathon.config.security.JwtTokenProvider;
import com.ssafy.marathon.controller.patient.PatientSignController;
import com.ssafy.marathon.dto.request.user.PatientReqDto;
import com.ssafy.marathon.dto.request.user.UserReqDto;
import com.ssafy.marathon.dto.response.user.PatientResDto;
import com.ssafy.marathon.dto.response.user.UserResDto;
import com.ssafy.marathon.service.admin.AdminSignService;
import com.ssafy.marathon.service.patient.PatientSignServiceImpl;
import java.util.HashMap;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("admin-sign")
@RestController
@RequiredArgsConstructor
public class AdminSignController {
    private final AdminSignService adminSignService;
    private final JwtTokenProvider jwtTokenProvider;
    private final Logger LOGGER = LoggerFactory.getLogger(PatientSignController.class);
    @GetMapping("/modify")
    public ResponseEntity<?> loadInfo(@RequestHeader("Access-Token") String accessToken) {
        Long seq = jwtTokenProvider.getUserSeq(accessToken);
        LOGGER.info("[loadInfo] 관리자정보 로드 시작 ");
        UserResDto adminResDto = adminSignService.getAdmin(seq);
        LOGGER.info("[loadInfo] 관리자정보 로드 완료 ");
        return new ResponseEntity<UserResDto>(adminResDto, HttpStatus.OK);
    }

    @PutMapping("/modify")
    public ResponseEntity<?> modifyAdmin(@RequestHeader("Access-Token") String accessToken, @RequestPart(name = "admin") UserReqDto adminReqDto, @RequestPart MultipartFile image)
        throws Exception {
        Long seq = jwtTokenProvider.getUserSeq(accessToken);
        LOGGER.info("[modifyAdmin] 관리자정보 수정 시작 ");
        String token = adminSignService.modifyAdmin(seq, adminReqDto, image);
        HashMap<String, String> tokenMap = new HashMap<>();
        tokenMap.put("accessToken", token);
        LOGGER.info("[modifyAdmin] 관리자정보 수정 완료 ");
        return new ResponseEntity<HashMap<String, String>>(tokenMap, HttpStatus.CREATED);
    }

}
