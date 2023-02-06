package com.ssafy.marathon.db.entity.game;

import com.ssafy.marathon.db.entity.user.Patient;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "game_score")
public class GameScore {

    @Id
    @GeneratedValue
    private Long seq;

//    @ManyToOne(targetEntity = GameCategory.class)
//    @JoinColumn(name = "game_category_seq")
    private int gameType;

    private String difficulty;

    private LocalDate date;

    private LocalTime time;

    private int correct;

    @ManyToOne(targetEntity = Patient.class)
    @JoinColumn(name = "patient_seq")
    private Patient patient;
}
