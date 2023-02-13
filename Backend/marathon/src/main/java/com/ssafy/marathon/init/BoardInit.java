package com.ssafy.marathon.init;

import com.ssafy.marathon.db.entity.board.Board;
import com.ssafy.marathon.db.entity.user.Admin;
import com.ssafy.marathon.db.repository.AdminRepository;
import com.ssafy.marathon.db.repository.BoardRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.info.ProjectInfoProperties.Build;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class BoardInit {
    private final Logger LOGGER = LoggerFactory.getLogger(AdminInit.class);

    private final BoardRepository boardRepository;
    @PostConstruct
    protected void init() {
        LOGGER.info("[init] 공지사항 생성 시작");
        for (int i = 0; i < 30; i++) {
            Board board = Board.builder()
                .title(i + "번째 공지")
                .registDate(LocalDateTime.now())
                .content(i + "번째 내용").build();
            boardRepository.save(board);
        }
        LOGGER.info("[init] 공지사항 완료 ");
    }
}
