package com.ssafy.marathon.service.doctor;


import com.ssafy.marathon.dto.request.communication.MessageReqDto;
import com.ssafy.marathon.dto.request.treatment.ReservationReqDto;
import com.ssafy.marathon.dto.response.treatment.DayOfReservationResDto;
import com.ssafy.marathon.dto.response.treatment.DayOfTreatmentResDto;
import com.ssafy.marathon.dto.response.treatment.HistoryResDto;
import com.ssafy.marathon.dto.response.treatment.ReservationResDto;
import java.util.List;
import org.springframework.data.domain.Page;

public interface TreatmentService {

    int countRaws(Long doctorSeq);

    void makeEmptyReservation(Long doctorSeq);

    List<DayOfReservationResDto> makeReservationList(Long doctorSeq);

    ReservationResDto makeReservationResDto(Long doctorSeq);

    void updateReservation(List<ReservationReqDto> list);

    List<DayOfTreatmentResDto> getTreatments(Long doctorSeq);


}
