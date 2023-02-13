package com.ssafy.marathon.db.entity.treatment;

import com.ssafy.marathon.db.entity.user.Doctor;
import java.time.LocalDate;
import javax.persistence.*;

import lombok.*;

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

    private LocalDate date;

    private String bitDate;

    @ManyToOne
    @JoinColumn(name = "doctor_seq")
    private Doctor doctor;
}
