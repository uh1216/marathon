package com.ssafy.marathon.db.repository;

import com.ssafy.marathon.db.entity.user.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository<T extends Doctor> extends JpaRepository<T, Long> {

    Doctor getBySeq(Long seq);

}
