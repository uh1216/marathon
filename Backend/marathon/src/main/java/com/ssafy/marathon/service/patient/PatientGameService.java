package com.ssafy.marathon.service.patient;

import com.ssafy.marathon.dto.request.game.GameReqDto;
import com.ssafy.marathon.dto.response.game.GameAnalysisResDto;
import com.ssafy.marathon.dto.response.game.GameResDto;
import java.util.List;
import javax.persistence.EntityManager;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public interface PatientGameService {
    Void saveRecord(Long patientSeq, GameReqDto gameReqDto);

    Page<GameResDto> getPages(Long patientSeq, int page);

    GameAnalysisResDto getAnalysis(Long patientSeq);

}
