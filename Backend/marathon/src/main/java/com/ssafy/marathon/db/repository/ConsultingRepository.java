package com.ssafy.marathon.db.repository;

import com.ssafy.marathon.db.entity.consulting.Consulting;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsultingRepository extends JpaRepository<Consulting, Long> {

    Page<Consulting> findAllByOrderByCheckedAsc(Pageable pageable);
}
