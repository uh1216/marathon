package com.ssafy.marathon.db.repository;

import com.ssafy.marathon.db.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository<T extends User> extends JpaRepository<T, Long> {

    User getById(String id);
}
