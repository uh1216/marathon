package com.ssafy.marathon.service.patient;

import com.ssafy.marathon.db.entity.treatment.Treatment;
import com.ssafy.marathon.dto.response.treatment.DayOfReservationResDto;
import com.ssafy.marathon.dto.response.treatment.DayOfTreatmentResDto;
import com.ssafy.marathon.dto.response.treatment.TreatmentResDto;
import com.ssafy.marathon.dto.response.user.DoctorResDto;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public interface PatientTreatmentService {
    List<DoctorResDto> getDoctorList();

    List<DayOfReservationResDto> getDoctorReservationTime(Long doctorSeq);

    Treatment makeTreatment(Long doctorSeq, Long patientSeq, List<DayOfReservationResDto> list);

    List<DayOfTreatmentResDto> getCalendar(Long patientSeq);
}
