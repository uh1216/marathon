package com.ssafy.marathon.db.repository;

import com.ssafy.marathon.db.entity.user.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    Doctor getBySeq(Long seq);

}
