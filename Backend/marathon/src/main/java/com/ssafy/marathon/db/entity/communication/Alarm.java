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

//    @Id
//    @GeneratedValue
//    @Column(name = "alarm_seq")
//    private Long alarmSeq;

    private String alarmTitle;

    private String alarmLink;

}
