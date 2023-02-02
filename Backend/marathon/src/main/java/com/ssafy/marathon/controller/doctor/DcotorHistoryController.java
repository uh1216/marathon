package com.ssafy.marathon.controller.doctor;

import com.ssafy.marathon.config.security.JwtTokenProvider;
import com.ssafy.marathon.dto.request.treatment.HistoryReqDto;
import com.ssafy.marathon.dto.response.treatment.HistoryResDto;
import com.ssafy.marathon.service.doctor.DoctorHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/doctor-history")
@RequiredArgsConstructor
public class DcotorHistoryController {

    private final JwtTokenProvider jwtTokenProvider;

    private final DoctorHistoryService historyService;

    @GetMapping("/nf-list")
    public ResponseEntity<?> getNonFeedbackPages(@RequestHeader("Access-Token") String accessToken,
        @RequestParam int page) {
        Long seq = jwtTokenProvider.getUserSeq(accessToken);
        Page<HistoryResDto> pages = historyService.getNonFeedbackPages(page - 1, seq);

        return new ResponseEntity<Page<HistoryResDto>>(pages, HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<?> getFeedbackPages(@RequestHeader("Access-Token") String accessToken,
        @RequestParam int page) {
        Long seq = jwtTokenProvider.getUserSeq(accessToken);
        Page<HistoryResDto> pages = historyService.getFeedbackPages(page - 1, seq);

        return new ResponseEntity<Page<HistoryResDto>>(pages, HttpStatus.OK);
    }

    @PutMapping("/feedback")
    public ResponseEntity<?> writeFeedback(@RequestBody HistoryReqDto historyReqDto) {
        historyService.writeFeedback(historyReqDto);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @GetMapping("/detail/{history-seq}")
    public HistoryResDto getHistoryDetail(@PathVariable("history-seq") Long historySeq){

        HistoryResDto HistoryResDto = historyService.getHistoryDetail(historySeq);

        return HistoryResDto;
    }

}
