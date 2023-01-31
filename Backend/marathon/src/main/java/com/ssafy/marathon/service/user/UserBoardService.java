package com.ssafy.marathon.service.user;

import com.ssafy.marathon.db.entity.board.Board;
import com.ssafy.marathon.db.repository.BoardRepository;
import com.ssafy.marathon.dto.response.board.BoardResDto;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserBoardService {

    private final BoardRepository boardRepository;

    public BoardResDto getDetailBoard(Long id) {
        Optional<Board> findBoard = boardRepository.findById(id);
        Board board = findBoard.orElseThrow();

        BoardResDto boardResDto = BoardResDto.builder()
            .boardSeq(board.getSeq())
            .title(board.getTitle())
            .content(board.getContent())
            .registDate(board.getRegistDate())
            .viewCnt(board.getViewCnt())
            .build();

        return boardResDto;
    }

    public Page<BoardResDto> getBoardList(int pageNum) {
        PageRequest pageRequest = PageRequest.of(pageNum, 10);

        Page<BoardResDto> boardResDtoList = boardRepository.findAll(pageRequest)
            .map(board -> BoardResDto.builder()
                .boardSeq(board.getSeq())
                .title(board.getTitle())
                .registDate(board.getRegistDate())
                .viewCnt(board.getViewCnt())
                .build());

        return boardResDtoList;
    }
}
