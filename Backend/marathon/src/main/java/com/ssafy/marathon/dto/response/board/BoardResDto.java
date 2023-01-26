package com.ssafy.marathon.dto.response.board;

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
public class BoardResDto {

    private Long seq;
    private String title;
    private String content;
    private LocalDate registDate;
    private String viewCnt;

}
