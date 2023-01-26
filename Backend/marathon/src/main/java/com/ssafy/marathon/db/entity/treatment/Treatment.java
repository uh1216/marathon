package com.ssafy.marathon.db.entity.treatment;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@Table(name = "treatment")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Treatment {

    @Id
    @GeneratedValue
    private Long seq;
    private String date;
    private String time;
//    private Docter docter;
//    private Patient patient;
}
