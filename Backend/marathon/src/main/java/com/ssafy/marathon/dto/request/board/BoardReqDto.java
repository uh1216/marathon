package com.ssafy.marathon.dto.request.board;

import java.time.LocalDate;
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
public class BoardReqDto {

    private String title;
    private String content;
    private LocalDate registDate;
    private String viewCnt;

}
