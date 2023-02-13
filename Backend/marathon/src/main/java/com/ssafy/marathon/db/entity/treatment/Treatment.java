package com.ssafy.marathon.db.entity.treatment;

import com.ssafy.marathon.db.entity.user.Doctor;
import com.ssafy.marathon.db.entity.user.Patient;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import javax.persistence.*;

import lombok.*;

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
    private LocalDate date;
    private LocalTime time;
    @ManyToOne
    @JoinColumn(name = "doctor_seq")
    private Doctor doctor;
    @ManyToOne
    @JoinColumn(name = "patient_seq")
    private Patient patient;
}
