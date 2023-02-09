package com.ssafy.marathon.db.repository;

import com.ssafy.marathon.db.entity.treatment.Treatment;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TreatmentRepository extends JpaRepository<Treatment, Long> {

    List<Treatment> findByDateBetween(LocalDate start, LocalDate end);

    List<Treatment> findAllByPatient_Seq(Long patientSeq);

    List<Treatment> findDistinctByDoctor_SeqAndDateBetween(Long doctorSeq, LocalDate start,
        LocalDate end);

    List<Treatment> findDistinctByPatient_SeqAndDateBetween(Long patientSeq, LocalDate start,
        LocalDate end);

    Treatment findBySeq(Long seq);

}
