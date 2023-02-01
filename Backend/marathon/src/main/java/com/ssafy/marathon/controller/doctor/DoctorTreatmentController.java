package com.ssafy.marathon.controller.doctor;


import com.ssafy.marathon.dto.response.treatment.ReservationResDto;
import com.ssafy.marathon.service.doctor.TreatmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/doctor-treatment")
public class DoctorTreatmentController {

    @Autowired
    public TreatmentService treatmentService;

    @GetMapping("/table")
    public ResponseEntity<?> getTables() {
//      의사의 예약이 21개가 아니면 21개까지 생성한다
        if (treatmentService.countRaws() != 21) {
            treatmentService.makeEmptyReservation();
        }
//        예약 정보를 가져오기
        ReservationResDto reservationResDto = treatmentService.makeReservationResDto();
//        반환
        return new ResponseEntity<ReservationResDto>(reservationResDto, HttpStatus.OK);
    }

}
