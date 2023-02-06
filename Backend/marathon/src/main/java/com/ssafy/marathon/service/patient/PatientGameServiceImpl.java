package com.ssafy.marathon.service.patient;

import com.ssafy.marathon.db.entity.game.GameScore;
import com.ssafy.marathon.db.repository.GameScoreRepository;
import com.ssafy.marathon.db.repository.PatientRepository;
import com.ssafy.marathon.dto.request.game.GameReqDto;
import com.ssafy.marathon.dto.response.game.GameAnalysisResDto;
import com.ssafy.marathon.dto.response.game.GameResDto;
//import com.ssafy.marathon.dto.response.game.gameDateMapping;
import com.ssafy.marathon.dto.response.treatment.HistoryResDto;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PatientGameServiceImpl implements PatientGameService{

    private final PatientRepository patientRepository;

    private final GameScoreRepository gameScoreRepository;

    @Override
    public Void saveRecord(Long patientSeq, GameReqDto gameReqDto) {

        GameScore gameScore = GameScore.builder()
            .gameType(gameReqDto.getGameType())
            .difficulty(gameReqDto.getDifficulty())
            .correct(gameReqDto.getCorrect())
            .date(gameReqDto.getDate())
            .time(gameReqDto.getTime())
            .patient(patientRepository.findBySeq(patientSeq))
            .build();

        gameScoreRepository.save(gameScore);

        return null;
    }

    @Override
    public Page<GameResDto> getPages(Long patientSeq, int page) {

        List<GameScore> list = gameScoreRepository.findAllByPatient_Seq(patientSeq);
        List<GameResDto> dtoList = new ArrayList<>();

        for (GameScore gameScore:list) {
            GameResDto gameResDto = GameResDto.builder()
                .gameSeq(gameScore.getSeq())
                .gameType(gameScore.getGameType())
                .difficulty(gameScore.getDifficulty())
                .date(gameScore.getDate())
                .time(gameScore.getTime())
                .accuracy(gameScore.getCorrect())
                .build();

            dtoList.add(gameResDto);
        }


        //        list to page
        PageRequest pageRequestForList = PageRequest.of(page, 5);
        int start = (int) pageRequestForList.getOffset();
        int end = Math.min((start + pageRequestForList.getPageSize()), dtoList.size());
        Page<GameResDto> gameResDtoPage = new PageImpl<>(dtoList.subList(start, end),
            pageRequestForList, dtoList.size());

        return gameResDtoPage;
    }

//    @Override
//    public List<GameAnalysisResDto> getAnalysis(Long patientSeq) {
//
//        GameScore lastGame = gameScoreRepository.findFirstByPatient_Seq(patientSeq);
//
//        for (int i = 1; i < 4; i++) {
//            int easyHighScore = gameScoreRepository.findFirstByPatient_SeqAndDifficultyAndGameTypeAndOrderByCorrectDesc(patientSeq, "easy", i).getCorrect();
//            int normalHighScore = gameScoreRepository.findFirstByPatient_SeqAndDifficultyAndGameTypeAndOrderByCorrectDesc(patientSeq, "normal", i).getCorrect();
//            int hardHighScore = gameScoreRepository.findFirstByPatient_SeqAndDifficultyAndGameTypeAndOrderByCorrectDesc(patientSeq, "hard", i).getCorrect();
//        }
//
////        먼저 해야할것....
////        1. 난이도별 가장 최근 5일의 날짜를 뽑는다 5개가 안되더라도 괜찮음...
////        2. 가장 최근 5일의 날짜를 각각 탐색하여 평균값을 내어 Map에 담는다...
////        3. 해당 Map을 list에 담아 하나의 변수에 저장한다
//
//            for (int i = 1; i < 4; i++) {
//                List<gameDateMapping> dateList = gameScoreRepository.findFirst5ByGameTypeOrderAndPatient_SeqAndDifficultyByDateDesc(i, patientSeq, "easy");
//            for (gameDateMapping date :dateList) {
//                date
//            }
//
//        }
//
//
//
//
//
//
//
//
//
//        return null;
//    }
}
