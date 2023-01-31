package com.ssafy.marathon.dto.response.board;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class BoardResDto {

    private Long boardSeq;
    private String title;
    private String content;
    private LocalDateTime registDate;
    private int viewCnt;

}
