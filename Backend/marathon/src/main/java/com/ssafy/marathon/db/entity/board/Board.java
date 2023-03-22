package com.ssafy.marathon.db.entity.board;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity
@Table(name = "board")
public class Board {

    @Id
    @GeneratedValue
    private long seq;
    private String title;
    private String content;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime registDate;
    private int viewCnt;

    public void addViewCnt() {
        this.viewCnt += 1;
    }

    public void updateBoard(String content, String title) {
        this.content = content;
        this.title = title;
    }
}
