package com.ssafy.marathon.db.repository;

import com.ssafy.marathon.db.entity.board.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {

}
