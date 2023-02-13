package com.ssafy.marathon.service.doctor;

import com.ssafy.marathon.dto.request.treatment.HistoryReqDto;
import com.ssafy.marathon.dto.response.treatment.HistoryResDto;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public interface DoctorHistoryService {

    Page<HistoryResDto> getNonFeedbackPages(int page, Long doctorSeq);

    Page<HistoryResDto> getFeedbackPages(int i, Long doctorSeq);

    Void writeFeedback(HistoryReqDto historyReqDto);

    HistoryResDto getHistoryDetail(Long historySeq);

    void makeHistory(Long doctorSeq, Long treatmentSeq);

    Long getHistorySeq(Long treatmentSeq);
}
