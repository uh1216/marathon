package com.ssafy.marathon.db.entity.board;

import java.time.LocalDateTime;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "board")
public class Board {

    @Id
    @GeneratedValue
    private long seq;
    private String title;
    private String content;
    private LocalDateTime registDate;
    private int viewCnt;
}
