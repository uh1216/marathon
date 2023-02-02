package com.ssafy.marathon.controller.doctor;


import com.ssafy.marathon.config.security.JwtTokenProvider;
import com.ssafy.marathon.dto.request.communication.MessageReqDto;
import com.ssafy.marathon.dto.request.treatment.ReservationReqDto;
import com.ssafy.marathon.dto.response.treatment.DayOfReservationResDto;
import com.ssafy.marathon.dto.response.treatment.DayOfTreatmentResDto;
import com.ssafy.marathon.dto.response.treatment.HistoryResDto;
import com.ssafy.marathon.dto.response.treatment.ReservationResDto;
import com.ssafy.marathon.dto.response.treatment.TreatmentResDto;
import com.ssafy.marathon.service.doctor.TreatmentService;
import com.ssafy.marathon.util.MilliFunc;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/doctor-treatment")
@RequiredArgsConstructor
public class DoctorTreatmentController {

    private final TreatmentService treatmentService;
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping("/table")
    public ResponseEntity<?> getTable(@RequestHeader("access-token") String accessToken) {
        Long seq = jwtTokenProvider.getUserSeq(accessToken);
        System.out.println(seq);
//      의사의 예약이 21개가 아니면 21개까지 생성한다
        if (treatmentService.countRaws(seq) != 21) {
            treatmentService.makeEmptyReservation(seq);
        }
//        예약 정보를 가져오기
        ReservationResDto reservationResDto = treatmentService.makeReservationResDto(seq);
//        반환
        return new ResponseEntity<ReservationResDto>(reservationResDto, HttpStatus.OK);
    }

    @PutMapping("/table")
    public ResponseEntity<?> updateTable(@RequestBody Map<String, List<ReservationReqDto>> map) {
//        System.out.println(list);
        treatmentService.updateReservation(map.get("list"));
        return new ResponseEntity<Void>(HttpStatus.CREATED);
    }

    //    img 추가?
    @GetMapping("/calendar")
    public ResponseEntity<?> getCalendar(@RequestHeader("Access-Token") String accessToken) {
        Long seq = jwtTokenProvider.getUserSeq(accessToken);
        List<DayOfTreatmentResDto> list = treatmentService.getTreatments(seq);

        TreatmentResDto treatmentResDto = TreatmentResDto.builder()
            .firstDateInfo(MilliFunc.startDayMilliSec())
            .list(list)
            .build();

        return new ResponseEntity<TreatmentResDto>(treatmentResDto, HttpStatus.OK);
    }

//    @GetMapping("/nf-list")
//    public ResponseEntity<?> getNonFeedbackPages(@RequestHeader("Access-Token") String accessToken,
//        @RequestParam int page) {
//        Long seq = jwtTokenProvider.getUserSeq(accessToken);
//        Page<HistoryResDto> pages = treatmentService.getNonFeedbackPages(page - 1, seq);
//
//        return new ResponseEntity<Page<HistoryResDto>>(pages, HttpStatus.OK);
//    }
//
//    @GetMapping("/list")
//    public ResponseEntity<?> getFeedbackPages(@RequestHeader("Access-Token") String accessToken, @RequestParam int page){
//        Long seq = jwtTokenProvider.getUserSeq(accessToken);
//        Page<HistoryResDto> pages = treatmentService.getFeedbackPages(page - 1, seq);
//
//        return new ResponseEntity<Page<HistoryResDto>>(pages, HttpStatus.OK);
//    }


}
