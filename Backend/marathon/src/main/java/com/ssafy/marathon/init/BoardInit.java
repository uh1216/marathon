package com.ssafy.marathon.init;

import com.ssafy.marathon.db.entity.board.Board;
import com.ssafy.marathon.db.repository.BoardRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
                .content(i + "번째 내용")
                .build();
            boardRepository.save(board);
        }
        Board boardAm = Board.builder()
            .title("오전 공지")
            .registDate(LocalDateTime.of(LocalDate.now(), LocalTime.of(9, 0, 0)))
            .content("오전 공지 내용")
            .build();
        boardRepository.save(boardAm);

        Board boardPm = Board.builder()
            .title("오후 공지")
            .registDate(LocalDateTime.of(LocalDate.now(), LocalTime.of(13, 0, 0)))
            .content("오후 공지 내용")
            .build();
        boardRepository.save(boardPm);
        LOGGER.info("[init] 공지사항 완료 ");
    }
}
