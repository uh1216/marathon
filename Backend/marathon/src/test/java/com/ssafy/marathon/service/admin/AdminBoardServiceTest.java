package com.ssafy.marathon.service.admin;

import com.ssafy.marathon.db.entity.board.Board;
import com.ssafy.marathon.db.repository.BoardRepository;
import com.ssafy.marathon.dto.request.board.BoardReqDto;
import java.util.Optional;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@Rollback(value = false)
class AdminBoardServiceTest {

    @Autowired
    AdminBoardService adminBoardService;
    @Autowired
    BoardRepository boardRepository;

    @Test
    public void 공지사항작성() throws Exception {
        //given
        BoardReqDto boardReqDto = BoardReqDto.builder()
            .title("test")
            .content("hihi")
            .build();

        //when
        adminBoardService.writeBoard(boardReqDto);

        Optional<Board> findBoard = boardRepository.findById(1L);
        Board board = findBoard.orElseThrow();
        //then
        Assertions.assertThat(boardReqDto.getTitle()).isEqualTo(board.getTitle());
    }

    @Test
    public void 공지사항수정() throws Exception {
        //given

        //when

        //then
    }

    @Test
    public void 공지사항삭제() throws Exception {
        //given

        //when

        //then
    }

}