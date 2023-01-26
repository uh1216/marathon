package com.ssafy.marathon.db.entity.treatment;

import com.ssafy.marathon.db.entity.user.Doctor;
import com.ssafy.marathon.db.entity.user.Patient;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
    @ManyToOne
    @JoinColumn(name = "doctor_seq")
    private Doctor doctor;
    @ManyToOne
    @JoinColumn(name = "patient_seq")
    private Patient patient;
}
