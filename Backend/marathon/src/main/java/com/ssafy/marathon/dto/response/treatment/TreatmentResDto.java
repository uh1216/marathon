package com.ssafy.marathon.dto.response.treatment;

import java.util.List;
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
public class TreatmentResDto {
    private Long firstDateInfo;

    private List<DayOfTreatmentResDto> list;

}
