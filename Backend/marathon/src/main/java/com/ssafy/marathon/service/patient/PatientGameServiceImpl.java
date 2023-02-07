package com.ssafy.marathon.service.patient;

import com.ssafy.marathon.db.entity.game.GameScore;
import com.ssafy.marathon.db.repository.GameScoreRepository;
import com.ssafy.marathon.db.repository.PatientRepository;

import com.ssafy.marathon.dto.request.game.GameReqDto;
import com.ssafy.marathon.dto.response.game.EachGameDataResDto;
import com.ssafy.marathon.dto.response.game.GameAnalysisResDto;
import com.ssafy.marathon.dto.response.game.GameResDto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PatientGameServiceImpl implements PatientGameService{

    private final PatientRepository patientRepository;

    private final GameScoreRepository gameScoreRepository;


    @Override
    public Void saveRecord(Long patientSeq, GameReqDto gameReqDto) {

//        System.out.println(">>>>>>>>>>>>>>>>>>>>>" + LocalDate.now() + " | " + LocalTime.now());

        GameScore gameScore = GameScore.builder()
            .gameType(gameReqDto.getGameType())
            .difficulty(gameReqDto.getDifficulty())
            .correct(gameReqDto.getCorrect())
            .date(LocalDate.now())
            .time(LocalTime.now())
            .patient(patientRepository.findBySeq(patientSeq))
            .build();

        gameScoreRepository.save(gameScore);

        return null;
    }

    @Override
    public Page<GameResDto> getPages(Long patientSeq, int page) {

        List<GameScore> list = gameScoreRepository.findAllByPatient_SeqOrderBySeqDesc(patientSeq);
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

//        Sort sort = Sort.by(Sort.Direction.DESC, "seq");
        //        list to page
        PageRequest pageRequestForList = PageRequest.of(page, 5);
        int start = (int) pageRequestForList.getOffset();
        int end = Math.min((start + pageRequestForList.getPageSize()), dtoList.size());
        Page<GameResDto> gameResDtoPage = new PageImpl<>(dtoList.subList(start, end),
            pageRequestForList, dtoList.size());

        return gameResDtoPage;
    }



    @Override
//    @Query("SELECT g.date, avg(g.correct) FROM GameScore g WHERE g.gameType = ?1 GROUP BY g.date ORDER BY g.date LIMIT 5")
    public GameAnalysisResDto getAnalysis(Long patientSeq) {

//        List<String> dataList = gameScoreRepository.findAllByPatient(1, patientSeq);
//        List<String> gett = gameScoreRepository.findAllByPatient(1, patientSeq);
//        for (String ge:
//        gett) {
//            System.out.println(ge);
//        }
//      가장 최근 최고 기록
        GameScore lastGame = gameScoreRepository.findFirstByPatient_SeqOrderByDateDesc(patientSeq);

        GameAnalysisResDto gameAnalysisResDto = GameAnalysisResDto.builder()
            .lastGameDate(lastGame.getDate())
            .lastGameAccuarcy(lastGame.getCorrect())
            .lastGameDifficulty(lastGame.getDifficulty())
            .lastGameDate(lastGame.getDate())
            .lastGameTime(lastGame.getTime())
            .list(new ArrayList<>())
            .build();

        for (int i = 1; i < 4; i++) {
//          게임별 난이도 최고 기록

            GameScore easy = gameScoreRepository.findFirstByPatient_SeqAndDifficultyAndGameTypeOrderByCorrectDesc(patientSeq, "easy", i);
            GameScore normal = gameScoreRepository.findFirstByPatient_SeqAndDifficultyAndGameTypeOrderByCorrectDesc(patientSeq, "normal", i);
            GameScore hard = gameScoreRepository.findFirstByPatient_SeqAndDifficultyAndGameTypeOrderByCorrectDesc(patientSeq, "hard", i);

            int easyHighScore = easy != null ? easy.getCorrect() : 0;
            int normalHighScore = normal != null ? normal.getCorrect() : 0;;
            int hardHighScore = hard != null ? hard.getCorrect() : 0;
//          게임별 최근 5개의 평균
            List<String> easyAvgScoreList = gameScoreRepository.findAllByPatient(i, patientSeq, "easy");
            List<String> normalAvgScoreList = gameScoreRepository.findAllByPatient(i, patientSeq, "normal");
            List<String> hardAvgScoreList = gameScoreRepository.findAllByPatient(i, patientSeq, "hard");
            EachGameDataResDto eachGameDataResDto = EachGameDataResDto.builder()
                .easyHighScore(easyHighScore)
                .normalHighScore(normalHighScore)
                .hardHighScore(hardHighScore)
                .easyRecentAccuary(easyAvgScoreList)
                .normalRecentAccuary(normalAvgScoreList)
                .hardRecentAccuary(hardAvgScoreList)
                .build();

            gameAnalysisResDto.getList().add(eachGameDataResDto);
        }
        return gameAnalysisResDto;
    }
}
