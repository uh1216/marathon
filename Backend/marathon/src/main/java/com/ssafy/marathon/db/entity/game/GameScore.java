package com.ssafy.marathon.db.entity.game;

import com.ssafy.marathon.db.entity.user.Patient;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity
@Table(name = "game_score")
public class GameScore {

    @Id
    @GeneratedValue
    private Long seq;

    private int gameType;

    private String difficulty;

    private LocalDate date;

    private LocalTime time;

    private int correct;

    @ManyToOne(targetEntity = Patient.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_seq")
    private Patient patient;
}
