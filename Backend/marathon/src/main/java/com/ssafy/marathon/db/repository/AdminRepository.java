package com.ssafy.marathon.db.repository;

import com.ssafy.marathon.db.entity.user.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository <T extends Admin> extends JpaRepository<T, Long> {

    Admin getBySeq(Long seq);
}
