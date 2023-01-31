package com.ssafy.marathon.controller.user;

import com.ssafy.marathon.dto.response.board.BoardResDto;
import com.ssafy.marathon.service.user.UserBoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user-board")
public class UserBoardController {

    private final UserBoardService userBoardService;

    @GetMapping("/{boardSeq}")
    public BoardResDto getDetailBoard(@PathVariable Long boardSeq) {
        return userBoardService.getDetailBoard(boardSeq);
    }

    @GetMapping("/list")
    public Page<BoardResDto> getBoardList(@RequestParam int pageNum) {
        return userBoardService.getBoardList(pageNum);
    }
}
