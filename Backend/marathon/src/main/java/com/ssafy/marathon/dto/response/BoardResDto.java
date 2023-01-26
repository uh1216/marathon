package com.ssafy.marathon.dto.response;

import java.time.LocalDateTime;
import java.util.Date;
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
    private Date registDate;
    private String viewCnt;

}
