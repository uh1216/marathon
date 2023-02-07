package com.ssafy.marathon.db.repository;

import com.ssafy.marathon.db.entity.treatment.History;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoryRepository extends JpaRepository<History, Long> {
    History findBySeq(Long historySeq);
    List<History> findAllByDoctor_SeqAndFeedbackEquals(Long doctorSeq, String emptyString);
    List<History> findAllByDoctor_Seq(Long doctorSeq);

    List<History> findAllByPatient_Seq(Long patientSeq);

    List<History> findAllByDoctor_SeqAndPatient_Name(Long doctorSeq, String name);

}

