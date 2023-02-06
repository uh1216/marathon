package com.ssafy.marathon.dto.response.game;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
public class GameResDto {

    private Long gameSeq;

    private int gameType;

    private String difficulty;

    private LocalDate date;

    private LocalTime time;

    private float accuracy;
}
