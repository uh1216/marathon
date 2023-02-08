package com.ssafy.marathon.dto.response.game;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
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
public class GameAnalysisResDto {

    private int gameType;

    private LocalDate lastGameDate;

    private LocalTime lastGameTime;

    private String lastGameDifficulty;

    private float lastGameAccuarcy;

//  최근 게임
//    private List<EachGameDataResDto> list;

    private int easyHighScore;

    private int normalHighScore;

    private int hardHighScore;
    //  5days avg score
    private List<String> easyRecentAccuary;

    private List<String> normalRecentAccuary;

    private List<String> hardRecentAccuary;
}
