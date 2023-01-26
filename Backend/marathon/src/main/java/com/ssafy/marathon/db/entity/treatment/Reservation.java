package com.ssafy.marathon.db.entity.treatment;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@Table(name = "reservation")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reservation {

    @Id
    @GeneratedValue
    private Long seq;
    private String day;
    private String bitDate;
//    private Docter docter;
}
