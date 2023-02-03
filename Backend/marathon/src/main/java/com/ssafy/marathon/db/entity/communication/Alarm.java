package com.ssafy.marathon.db.entity.communication;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name = "alarm")
public class Alarm extends Communication {
    private String link;

}
