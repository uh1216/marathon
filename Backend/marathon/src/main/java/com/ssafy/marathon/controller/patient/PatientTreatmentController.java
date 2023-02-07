package com.ssafy.marathon.controller.patient;

import com.ssafy.marathon.config.security.JwtTokenProvider;
import com.ssafy.marathon.db.entity.treatment.Treatment;
import com.ssafy.marathon.dto.response.treatment.DayOfReservationResDto;
import com.ssafy.marathon.dto.response.treatment.DayOfTreatmentResDto;
import com.ssafy.marathon.dto.response.treatment.ReservationResDto;
import com.ssafy.marathon.dto.response.treatment.TreatmentResDto;
import com.ssafy.marathon.dto.response.user.DoctorResDto;
import com.ssafy.marathon.service.patient.PatientTreatmentService;
import com.ssafy.marathon.util.MilliFunc;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/patient-treatment")
@RequiredArgsConstructor
public class PatientTreatmentController {

    private final PatientTreatmentService patientTreatmentService;
    private final JwtTokenProvider jwtTokenProvider;
    @GetMapping("/list")
    public ResponseEntity<?> getDoctorList(){
        List<DoctorResDto> list = patientTreatmentService.getDoctorList();
        return new ResponseEntity<List<DoctorResDto>>(list, HttpStatus.OK);
    }

    @GetMapping("/book/{doctor-seq}")
    public ResponseEntity<?> getDoctorReservationTime(@PathVariable("doctor-seq") Long doctorSeq){

        List<DayOfReservationResDto> list = patientTreatmentService.getDoctorReservationTime(doctorSeq);

        ReservationResDto reservationResDto = ReservationResDto.builder()
            .firstDateInfo(MilliFunc.startDayMilliSec())
            .list(list)
            .build();

        return new ResponseEntity<ReservationResDto>(reservationResDto, HttpStatus.OK);
    }

    @PutMapping("/book/{doctor-seq}")
    public ResponseEntity<?> makeTreatment(
        @PathVariable("doctor-seq") Long doctorSeq,
        @RequestBody Map<String, List<DayOfReservationResDto>> map,
        @RequestHeader("Access-Token") String accessToken){

//        doctorSeq로 불러온 list와
//        map의 list를 비교하여 다른게 나오면 8번 반복하여 나온것에 덮어 씌우기
//        나온 인덱스를 참조하여 treatment테이블 생성
//        break -> break없으면 다중 예약

        Long patientSeq = jwtTokenProvider.getUserSeq(accessToken);
        Treatment treatment = patientTreatmentService.makeTreatment(doctorSeq, patientSeq, map.get("list"));

        if(treatment != null){
            return new ResponseEntity<Void>(HttpStatus.CREATED);
        }
        return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/calendar")
    public ResponseEntity<?> getCalendar(@RequestHeader("Access-Token") String accessToken){
        Long patientSeq = jwtTokenProvider.getUserSeq(accessToken);
        List<DayOfTreatmentResDto> list = patientTreatmentService.getCalendar(patientSeq);

        TreatmentResDto treatmentResDto = TreatmentResDto.builder()
            .firstDateInfo(MilliFunc.startDayMilliSec())
            .list(list)
            .build();

        return new ResponseEntity<TreatmentResDto>(treatmentResDto, HttpStatus.OK);
    }

}
