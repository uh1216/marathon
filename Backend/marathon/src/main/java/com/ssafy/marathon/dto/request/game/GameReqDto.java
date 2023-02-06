package com.ssafy.marathon.dto.request.game;

import java.time.LocalDate;
import java.time.LocalTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class GameReqDto {

    private int gameType;

    private String difficulty;

    private int correct;

    private LocalDate date;

    private LocalTime time;

}
