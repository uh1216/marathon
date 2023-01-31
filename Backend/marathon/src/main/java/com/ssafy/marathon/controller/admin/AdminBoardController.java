package com.ssafy.marathon.controller.admin;

import com.ssafy.marathon.dto.request.board.BoardReqDto;
import com.ssafy.marathon.service.admin.AdminBoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin-board")
public class AdminBoardController {

    private final AdminBoardService adminBoardService;

    @PostMapping("/notice")
    public void writeBoard(@RequestBody BoardReqDto boardReqDto) {
        adminBoardService.writeBoard(boardReqDto);
    }

    @PutMapping("/notice/{boardSeq}")
    public void updateBoard(@PathVariable Long boardSeq, @RequestBody BoardReqDto boardReqDto) {
        adminBoardService.updateBoard(boardSeq, boardReqDto);
    }

    @DeleteMapping("/notice/{boardSeq}")
    public void deleteBoard(@PathVariable Long boardSeq) {
        adminBoardService.deleteBoard(boardSeq);
    }
}
