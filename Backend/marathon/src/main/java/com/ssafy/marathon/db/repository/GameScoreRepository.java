package com.ssafy.marathon.db.repository;

import com.ssafy.marathon.db.entity.game.GameScore;
//import com.ssafy.marathon.dto.response.game.gameDateMapping;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameScoreRepository extends JpaRepository<GameScore, Long> {
    List<GameScore> findAllByPatient_Seq(Long patientSeq);

    GameScore findFirstByPatient_Seq(Long patientSeq);

//    GameScore findFirstByPatient_SeqAndDifficultyAndGameTypeOrderByCorrectDesc(Long patientSeq, String difficulty, Integer gameType);

//    List<gameDateMapping> findFirst5ByGameTypeOrderAndPatient_SeqAndDifficultyByDateDesc(int gameType, Long patientSeq, String difficulty);

}
