package com.ssafy.marathon.db.repository;

import com.ssafy.marathon.db.entity.user.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    Patient getBySeq(Long seq);

    Patient findBySeq(Long seq);
}
