package com.ssafy.marathon.db.repository;

import com.ssafy.marathon.db.entity.treatment.History;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoryRepository extends JpaRepository<History, Long> {

    History findBySeq(Long historySeq);

    History findByDoctor_SeqAndPatient_SeqAndDateAndTime(Long doctorSeq, Long patientSeq,
        LocalDate localDate, LocalTime localTime);

    List<History> findAllByDoctor_SeqAndFeedbackEquals(Long doctorSeq, String emptyString);

    List<History> findAllByDoctor_Seq(Long doctorSeq);

    List<History> findDistinctByDoctor_SeqAndDateBetween(Long doctorSeq, LocalDate start,
        LocalDate end);

    List<History> findDistinctByPatient_SeqAndDateBetween(Long patientSeq, LocalDate start,
        LocalDate end);

    List<History> findAllByPatient_Seq(Long patientSeq);

    List<History> findAllByDoctor_SeqAndPatient_NameContaining(Long doctorSeq, String name);

}

