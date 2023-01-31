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
public class DayOfTreatmentResDto {
    private Long treatmentSeq;
    private String doctorName;
    private String patientName;
    private LocalDateTime dateTime;
    private String day;
    private String doctorImg;
    private String patientImg;

}
