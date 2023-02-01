package com.ssafy.marathon.service.patient;

import com.ssafy.marathon.db.repository.ConsultingRepository;
import com.ssafy.marathon.dto.response.consulting.ConsultingResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class PatientConsultingService {

    private final ConsultingRepository consultingRepository;

//    public ConsultingResDto getConsultingForm(Long userSeq) {
//
//    }
}
