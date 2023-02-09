package com.ssafy.marathon.controller.doctor;


import com.ssafy.marathon.config.security.JwtTokenProvider;
import com.ssafy.marathon.dto.request.treatment.ReservationReqDto;
import com.ssafy.marathon.dto.response.treatment.DayOfTreatmentResDto;
import com.ssafy.marathon.dto.response.treatment.ReservationResDto;
import com.ssafy.marathon.dto.response.treatment.TreatmentResDto;
import com.ssafy.marathon.service.doctor.DoctorTreatmentService;
import com.ssafy.marathon.util.MilliFunc;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/doctor-treatment")
@RequiredArgsConstructor
public class DoctorTreatmentController {

    private final DoctorTreatmentService doctorTreatmentService;
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping("/table")
    public ResponseEntity<?> getTable(@RequestHeader("access-token") String accessToken) {
        Long seq = jwtTokenProvider.getUserSeq(accessToken);
        System.out.println(seq);
//      의사의 예약이 21개가 아니면 21개까지 생성한다
        if (doctorTreatmentService.countRaws(seq) != 21) {
            doctorTreatmentService.makeEmptyReservation(seq);
        }
//        예약 정보를 가져오기
        ReservationResDto reservationResDto = doctorTreatmentService.makeReservationResDto(seq);
//        반환
        return new ResponseEntity<ReservationResDto>(reservationResDto, HttpStatus.OK);
    }

    @PutMapping("/table")
    public ResponseEntity<?> updateTable(@RequestBody Map<String, List<ReservationReqDto>> map) {
//        System.out.println(list);
        doctorTreatmentService.updateReservation(map.get("list"));
        return new ResponseEntity<Void>(HttpStatus.CREATED);
    }

    //    img 추가?
    @GetMapping("/calendar")
    public ResponseEntity<?> getCalendar(@RequestHeader("Access-Token") String accessToken) {
        Long seq = jwtTokenProvider.getUserSeq(accessToken);
        List<DayOfTreatmentResDto> list = doctorTreatmentService.getTreatments(seq);

        TreatmentResDto treatmentResDto = TreatmentResDto.builder()
            .firstDateInfo(MilliFunc.startDayMilliSec())
            .list(list)
            .build();

        return new ResponseEntity<TreatmentResDto>(treatmentResDto, HttpStatus.OK);
    }

    @DeleteMapping("/{treatmentSeq}")
    public void deleteTreatment(@PathVariable Long treatmentSeq) {
        doctorTreatmentService.deleteTreatment(treatmentSeq);
    }

    @PostMapping("/alarm")
    public ResponseEntity<?> makeAlarm(
        @RequestBody Map<String, String> map
        , @RequestHeader("Access-Token") String accessToken
        ){

        String sessionId = map.get("sessionId");
        Long treatmentSeq = Long.parseLong(map.get("treatmentSeq"));
        Long doctorSeq = jwtTokenProvider.getUserSeq(accessToken);

        doctorTreatmentService.makeAlarmAndDelTreatment(treatmentSeq, sessionId, doctorSeq);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

}
