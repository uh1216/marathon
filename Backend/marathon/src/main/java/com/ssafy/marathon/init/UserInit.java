package com.ssafy.marathon.init;

import com.ssafy.marathon.db.entity.user.Admin;
import com.ssafy.marathon.db.entity.user.Doctor;
import com.ssafy.marathon.db.entity.user.Patient;
import com.ssafy.marathon.db.repository.AdminRepository;
import com.ssafy.marathon.db.repository.DoctorRepository;
import com.ssafy.marathon.db.repository.PatientRepository;
import java.time.LocalDate;
import java.util.Collections;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class UserInit {

    private final Logger LOGGER = LoggerFactory.getLogger(UserInit.class);
    private final AdminRepository adminRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final PasswordEncoder passwordEncoder;
    private static String defaultImg = "https://d1v10kml6l14kq.cloudfront.net/default.jpg";

    @PostConstruct
    protected void init() {
        LOGGER.info("[init] admin 유저생성 시작");
        Admin admin = Admin.builder()
            .id("ssafy")
            .password(passwordEncoder.encode("ssafy"))
            .roles(Collections.singletonList("ROLE_ADMIN"))
            .name("관리자").img(defaultImg)
            .build();
        adminRepository.save(admin);
        LOGGER.info("[init] admin 유저생성 완료 id : {}", admin.getId());
        Doctor doctor1 = Doctor.builder()
            .id("dusgkr")
            .password(passwordEncoder.encode("ssafy"))
            .roles(Collections.singletonList("ROLE_DOCTOR"))
            .name("이연학").img(defaultImg)
            .sex(true)
            .registDate(LocalDate.now())
            .build();
        doctorRepository.save(doctor1);
        Doctor doctor2 = Doctor.builder()
            .id("wjdtn")
            .password(passwordEncoder.encode("ssafy"))
            .roles(Collections.singletonList("ROLE_DOCTOR"))
            .name("김정수").img(defaultImg)
            .sex(true)
            .registDate(LocalDate.now())
            .build();
        doctorRepository.save(doctor2);
        Doctor doctor3 = Doctor.builder()
            .id("wnsdk")
            .password(passwordEncoder.encode("ssafy"))
            .roles(Collections.singletonList("ROLE_DOCTOR"))
            .name("최준아").img(defaultImg)
            .sex(false)
            .registDate(LocalDate.now())
            .build();
        doctorRepository.save(doctor3);
        Patient patient1 = Patient.builder()
            .id("dndgml")
            .password(passwordEncoder.encode("ssafy"))
            .roles(Collections.singletonList("ROLE_PATIENT"))
            .name("조웅희").img(defaultImg)
            .sex(true)
            .registDate(LocalDate.now())
            .build();
        patientRepository.save(patient1);
        Patient patient2 = Patient.builder()
            .id("ghtks")
            .password(passwordEncoder.encode("ssafy"))
            .roles(Collections.singletonList("ROLE_PATIENT"))
            .name("윤호산").img(defaultImg)
            .sex(true)
            .registDate(LocalDate.now())
            .build();
        patientRepository.save(patient2);
        Patient patient3 = Patient.builder()
            .id("ehddus")
            .password(passwordEncoder.encode("ssafy"))
            .roles(Collections.singletonList("ROLE_PATIENT"))
            .name("김동연").img(defaultImg)
            .sex(true)
            .registDate(LocalDate.now())
            .build();
        patientRepository.save(patient3);
    }
}
