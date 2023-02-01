package com.ssafy.marathon.db.repository;

import com.ssafy.marathon.db.entity.user.Doctor;
import com.ssafy.marathon.db.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository<T extends User> extends JpaRepository<T, Long> {

<<<<<<< HEAD
    User getById(String id);
=======
    Doctor findDoctorBySeq(Long seq);

>>>>>>> d538620f5bc581b7c19b7fe46e6945d14173e3a8
}
