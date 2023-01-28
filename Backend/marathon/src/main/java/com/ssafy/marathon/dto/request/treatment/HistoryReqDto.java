package com.ssafy.marathon.dto.request.treatment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HistoryReqDto {

    private Long historySeq;
    private Long doctorSeq;
    private Long userSeq;
    private String date;
    private String time;
    private String feedback;
}