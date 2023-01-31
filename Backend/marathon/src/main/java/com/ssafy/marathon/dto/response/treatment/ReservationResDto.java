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
public class ReservationResDto {
    /*
        1000 * 60 * 60 * 24 => 하루
        LocalDate.now().toEpochDay() + (1 - LocalDate.now().getDayOfWeek().getValue()) => 이번주의 epoch의 첫 월요일
        두개 곱해서 반환
    */
    private int firstDateInfo;

    private List<DayOfReservationResDto> list;

}
