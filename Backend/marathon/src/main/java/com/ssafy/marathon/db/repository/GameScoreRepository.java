package com.ssafy.marathon.db.repository;

import com.ssafy.marathon.db.entity.game.GameScore;
//import com.ssafy.marathon.dto.response.game.gameDateMapping;
import com.ssafy.marathon.db.entity.user.Patient;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface GameScoreRepository extends JpaRepository<GameScore, Long> {
    List<GameScore> findAllByPatient_SeqOrderBySeqDesc(Long patientSeq);

    GameScore findFirstByPatient_SeqAndGameTypeOrderByDateDesc(Long patientSeq, int gameType);

    @Query(value = "SELECT g.date, avg(g.correct) FROM game_score g WHERE g.game_type = ?1 AND g.patient_seq = ?2 AND g.difficulty = ?3 GROUP BY g.date ORDER BY g.date desc LIMIT 5", nativeQuery = true)
    List<String> findAllByPatient(int gameType, Long patient_seq, String difficulty);

    GameScore findFirstByPatient_SeqAndDifficultyAndGameTypeOrderByCorrectDesc(Long patientSeq, String difficulty, Integer gameType);

}
