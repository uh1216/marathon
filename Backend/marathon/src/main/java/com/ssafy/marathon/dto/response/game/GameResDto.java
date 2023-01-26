package com.ssafy.marathon.dto.response.game;

import java.time.LocalDateTime;
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
    private Long userSeq;
    private int difficulty;
    private float accuracy;
    private LocalDateTime date;

}
