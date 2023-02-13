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
    private LocalDate date;
    private LocalTime time;
    @ManyToOne
    @JoinColumn(name = "doctor_seq")
    private Doctor doctor;
    @ManyToOne
    @JoinColumn(name = "patient_seq")
    private Patient patient;
}
