package com.ssafy.marathon.controller.patient;

import com.ssafy.marathon.config.security.JwtTokenProvider;
import com.ssafy.marathon.dto.request.game.GameReqDto;
import com.ssafy.marathon.dto.response.game.GameAnalysisResDto;
import com.ssafy.marathon.dto.response.game.GameResDto;
import com.ssafy.marathon.service.patient.PatientGameService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/patient-game")
@RequiredArgsConstructor
public class PatientGameController {

    private final PatientGameService patientGameService;

    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/save")
    public ResponseEntity<?> saveRecord(
        @RequestBody GameReqDto gameReqDto,
        @RequestHeader("Access-Token") String accessToken
    ){
        Long patientSeq = jwtTokenProvider.getUserSeq(accessToken);


        patientGameService.saveRecord(patientSeq, gameReqDto);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<?> gamePagenation(
        @RequestParam("page") int page,
        @RequestHeader("Access-Token") String accessToken
    ){
        Long patientSeq = jwtTokenProvider.getUserSeq(accessToken);

        Page<GameResDto> pages = patientGameService.getPages(patientSeq, page - 1);

        return new ResponseEntity<Page<GameResDto>>(pages, HttpStatus.OK);
    }

//    @GetMapping("/analysis")
//    public ResponseEntity<?> getAnalysis(@RequestHeader("Access-Token") String accessToken){
//        Long patientSeq = jwtTokenProvider.getUserSeq(accessToken);
//
//        List<GameAnalysisResDto> list = patientGameService.getAnalysis(patientSeq);
//
//
//        return null;
//    }

}
