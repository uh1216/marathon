package com.ssafy.marathon.service.doctor;


import com.ssafy.marathon.dto.response.treatment.DayOfReservationResDto;
import com.ssafy.marathon.dto.response.treatment.ReservationResDto;
import java.util.List;

public interface TreatmentService {

    int countRaws();

    void makeEmptyReservation();

    List<DayOfReservationResDto> makeReservationList(Long doctorSeq);

    ReservationResDto makeReservationResDto();


}
