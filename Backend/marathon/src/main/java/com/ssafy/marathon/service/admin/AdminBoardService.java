package com.ssafy.marathon.service.admin;

import com.ssafy.marathon.db.entity.board.Board;
import com.ssafy.marathon.db.repository.BoardRepository;
import com.ssafy.marathon.dto.request.board.BoardReqDto;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminBoardService {

    private final BoardRepository boardRepository;

    public void writeBoard(BoardReqDto boardReqDto) {
        Board board = Board.builder()
            .title(boardReqDto.getTitle())
            .content(boardReqDto.getContent())
            .viewCnt(0)
            .registDate(LocalDateTime.now())
            .build();

        boardRepository.save(board);
    }

    public void updateBoard(Long id, BoardReqDto boardReqDto) {
        Optional<Board> findBoard = boardRepository.findById(id);

        Board board = findBoard.orElseThrow();
        board.setContent(boardReqDto.getContent());
        board.setTitle(boardReqDto.getTitle());
    }

    public void deleteBoard(Long id) {
        boardRepository.deleteById(id);
    }
}
