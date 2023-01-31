package com.ssafy.marathon.dto.response.treatment;

import java.time.LocalDateTime;
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

    //    common
    private Long historySeq;
    private LocalDateTime dateTime;
    private String day;
    private String feedback;
    private String videoUrl;
    //    doctor
    private String doctorName;
    private String doctorPhone;
    private String doctorImg;
    //    patient
    private String patientName;
    private String patientPhone;
    private String patientMainPhone;
}
