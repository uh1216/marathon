package com.ssafy.marathon.controller.patient;

import com.ssafy.marathon.config.security.JwtTokenProvider;
import com.ssafy.marathon.dto.response.treatment.HistoryResDto;
import com.ssafy.marathon.service.patient.PatientHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/patient-history")
@RequiredArgsConstructor
public class PatientHistoryController {

    private final JwtTokenProvider jwtTokenProvider;
    private final PatientHistoryService patientHistoryService;

    @GetMapping("list")
    public ResponseEntity<?> getHistories(@RequestParam("page") int page, @RequestHeader("Access-Token") String accessToken){
        Long patientSeq = jwtTokenProvider.getUserSeq(accessToken);

        Page<HistoryResDto> pages = patientHistoryService.getHistories(patientSeq, page-1);
        return new ResponseEntity<Page<HistoryResDto>>(pages, HttpStatus.OK);
    }

    @GetMapping("/detail/{history-seq}")
    public ResponseEntity<?> getDetail(@PathVariable("history-seq") Long historySeq){

        HistoryResDto historyResDto = patientHistoryService.getHistoryDetail(historySeq);

        return new ResponseEntity<HistoryResDto>(historyResDto, HttpStatus.OK);
    }

}
