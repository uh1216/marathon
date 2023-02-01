package com.ssafy.marathon.db.repository;

import com.ssafy.marathon.db.entity.communication.Communication;
import com.ssafy.marathon.db.entity.communication.Message;
import com.ssafy.marathon.db.entity.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunicationRepository<T extends Communication> extends JpaRepository<T, Long> {

    Page<Message> findByReceiver(User user, Pageable pageable);

    int countByReceiverAndCheckedIsFalse(User user);
}
