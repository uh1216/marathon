package com.ssafy.marathon.service.doctor;

import com.ssafy.marathon.db.entity.communication.Alarm;
import com.ssafy.marathon.db.entity.treatment.Treatment;
import com.ssafy.marathon.db.repository.CommunicationRepository;
import com.ssafy.marathon.db.repository.TreatmentRepository;
import com.ssafy.marathon.dto.request.communication.AlarmReqDto;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class DoctorCommunicationService {

    private final TreatmentRepository treatmentRepository;
    private final CommunicationRepository<Alarm> alarmRepository;

    public void CreateAlarm(AlarmReqDto alarmReqDto) {
        Optional<Treatment> findTreatment = treatmentRepository.findById(
            alarmReqDto.getTreatmentSeq());
        Treatment treatment = findTreatment.orElseThrow();

        Alarm alarm = Alarm.builder()
            .sender(treatment.getDoctor())
            .receiver(treatment.getPatient())
            .link(alarmReqDto.getLink()) // 링크는 나중에
            .checked(false)
            .dateTime(LocalDateTime.now())
            .build();
        alarmRepository.save(alarm);

        //TODO 화상 방 기능 만들고 history로 바로 넘길지 생각해보기

        treatmentRepository.delete(treatment);
    }
}
