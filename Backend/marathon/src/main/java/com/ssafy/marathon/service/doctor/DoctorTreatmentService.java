package com.ssafy.marathon.service.doctor;


import com.ssafy.marathon.dto.request.treatment.ReservationReqDto;
import com.ssafy.marathon.dto.response.treatment.DayOfReservationResDto;
import com.ssafy.marathon.dto.response.treatment.DayOfTreatmentResDto;
import com.ssafy.marathon.dto.response.treatment.ReservationResDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DoctorTreatmentService {

    int countRaws(Long doctorSeq);

    void makeEmptyReservation(Long doctorSeq);

    List<DayOfReservationResDto> makeReservationList(Long doctorSeq);

    ReservationResDto makeReservationResDto(Long doctorSeq);

    void updateReservation(List<ReservationReqDto> list);

    List<DayOfTreatmentResDto> getTreatments(Long doctorSeq);

    void deleteTreatment(Long treatmentSeq);

    boolean makeAlarm(Long treatmentSeq, String sessionId, Long doctorSeq);
}
