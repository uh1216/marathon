package com.ssafy.marathon.db.entity.game;

import com.ssafy.marathon.db.entity.user.Patient;
import java.time.LocalDateTime;
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

    @ManyToOne(targetEntity = Patient.class)
    @JoinColumn(name = "patient_seq")
    private Patient patient;

    @ManyToOne(targetEntity = GameCategory.class)
    @JoinColumn(name = "game_category_seq")
    private GameCategory gameCategory;

    private int difficulty;

    private float accuracy;

    private LocalDateTime date;
}
