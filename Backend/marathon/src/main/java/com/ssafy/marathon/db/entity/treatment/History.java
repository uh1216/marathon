package com.ssafy.marathon.db.entity.treatment;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@Table(name = "history")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class History {

    @Id
    @GeneratedValue
    private Long seq;
    private String feedback;
    private String videoUrl;
    private String date;
    private String time;
//    private Docter docter;
//    private Patient patient;
}
