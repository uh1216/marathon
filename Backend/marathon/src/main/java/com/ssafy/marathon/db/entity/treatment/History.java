package com.ssafy.marathon.db.entity.treatment;

import com.ssafy.marathon.db.entity.user.Doctor;
import com.ssafy.marathon.db.entity.user.Patient;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity
@Table(name = "history")
public class History {

    @Id
    @GeneratedValue
    private Long seq;
    private String feedback;
    private String videoUrl;
    private LocalDate date;
    private LocalTime time;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_seq")
    private Doctor doctor;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_seq")
    private Patient patient;

    public void updateFeedback(String feedback) {
        this.feedback = feedback;
    }

    public void updateVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }
}
