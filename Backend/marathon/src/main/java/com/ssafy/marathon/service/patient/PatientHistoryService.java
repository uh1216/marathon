package com.ssafy.marathon.service.patient;

import com.ssafy.marathon.dto.response.treatment.HistoryResDto;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public interface PatientHistoryService {

    Page<HistoryResDto> getHistories(Long patientSeq, int page);

    HistoryResDto getHistoryDetail(Long historySeq);
}
