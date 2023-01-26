package com.ssafy.marathon.db.entity.game;


import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "game_category")
public class GameCategory {

    @Id
    @GeneratedValue
    private Long seq;

    private String name;
}
