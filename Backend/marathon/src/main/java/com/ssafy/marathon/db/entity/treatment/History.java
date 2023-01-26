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
    @ManyToOne
    @JoinColumn(name = "doctor_seq")
    private Doctor doctor;
    @ManyToOne
    @JoinColumn(name = "patient_seq")
    private Patient patient;
}
