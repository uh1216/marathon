package com.ssafy.marathon.dto.response.treatment;

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
public class HistoryResDto {

    private Long historySeq;
    private Long doctorSeq;
    private Long patientSeq;
    private String patientName;
    private String patientPhone;
    private String patientMainPhone;
    private String date;
    private String time;
    private String feedback;
    private String videoUrl;
}
