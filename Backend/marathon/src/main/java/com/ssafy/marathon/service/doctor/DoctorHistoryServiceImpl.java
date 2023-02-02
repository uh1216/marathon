package com.ssafy.marathon.service.doctor;

import com.ssafy.marathon.db.entity.treatment.History;
import com.ssafy.marathon.db.repository.HistoryRepository;
import com.ssafy.marathon.dto.request.treatment.HistoryReqDto;
import com.ssafy.marathon.dto.response.treatment.HistoryResDto;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DoctorHistoryServiceImpl implements DoctorHistoryService {

    private final HistoryRepository historyRepository;

    @Override
    public Page<HistoryResDto> getNonFeedbackPages(int page, Long doctorSeq) {

        List<History> list = historyRepository.findAllByDoctor_SeqAndFeedbackEquals(doctorSeq, "");

        List<HistoryResDto> HistoryResList = new ArrayList<>();

        for (History history : list) {
            HistoryResDto historyResDto = HistoryResDto.builder()
                .historySeq(history.getSeq())
                .patientName(history.getPatient().getName())
                .dateTime(LocalDateTime.of(history.getDate(), history.getTime()))
                .day(history.getDate().getDayOfWeek().toString())
                .build();
            System.out.println(historyResDto.toString());
            HistoryResList.add(historyResDto);
        }

//        list to page
        PageRequest pageRequestForList = PageRequest.of(page, 5);
        int start = (int) pageRequestForList.getOffset();
        int end = Math.min((start + pageRequestForList.getPageSize()), HistoryResList.size());
        Page<HistoryResDto> historyResDtoPage = new PageImpl<>(HistoryResList.subList(start, end),
            pageRequestForList, HistoryResList.size());

        return historyResDtoPage;
    }

    @Override
    public Page<HistoryResDto> getFeedbackPages(int page, Long doctorSeq) {
        List<History> list = historyRepository.findAllByDoctor_Seq(doctorSeq);

        List<HistoryResDto> HistoryResList = new ArrayList<>();

        for (History history : list) {
            HistoryResDto historyResDto = HistoryResDto.builder()
                .historySeq(history.getSeq())
                .patientName(history.getPatient().getName())
                .dateTime(LocalDateTime.of(history.getDate(), history.getTime()))
                .day(history.getDate().getDayOfWeek().toString())
                .build();

            HistoryResList.add(historyResDto);
        }

//        list to page
        PageRequest pageRequestForList = PageRequest.of(page, 5);
        int start = (int) pageRequestForList.getOffset();
        int end = Math.min((start + pageRequestForList.getPageSize()), HistoryResList.size());
        Page<HistoryResDto> historyResDtoPage = new PageImpl<>(HistoryResList.subList(start, end),
            pageRequestForList, HistoryResList.size());

        return historyResDtoPage;
    }

    @Override
    public Void writeFeedback(HistoryReqDto historyReqDto) {
        History history = historyRepository.findBySeq(historyReqDto.getHistorySeq());
        history.setFeedback(historyReqDto.getFeedback());
        historyRepository.save(history);
        return null;
    }

    @Override
    public HistoryResDto getHistoryDetail(Long historySeq) {
        History history = historyRepository.findBySeq(historySeq);

        HistoryResDto historyResDto = HistoryResDto.builder()
            .historySeq(history.getSeq())
            .patientName(history.getPatient().getName())
            .patientPhone(history.getPatient().getPhone())
            .patientMainPhone(history.getPatient().getMainPhone())
            .dateTime(LocalDateTime.of(history.getDate(), history.getTime()))
            .day(history.getDate().getDayOfWeek().toString())
            .videoUrl(history.getVideoUrl())
            .feedback(history.getFeedback())
            .build();


        return historyResDto;
    }
}
