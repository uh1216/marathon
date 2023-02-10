package com.ssafy.marathon.db.repository;

import com.ssafy.marathon.db.entity.user.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository<T extends User> extends JpaRepository<T, Long> {

    User getById(String id);
    Optional<User> findById(String id);
    User findBySeq(Long seq);
    void deleteBySeq(Long seq);
    Optional<User> findByEmail(String email);

    List<User> findAllByDtypeIsNot(String role);

    void getByKakao(String kakao);
}
