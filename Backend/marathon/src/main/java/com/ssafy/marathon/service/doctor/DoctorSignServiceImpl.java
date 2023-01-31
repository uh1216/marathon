package com.ssafy.marathon.service.doctor;

import com.ssafy.marathon.db.entity.user.Doctor;
import com.ssafy.marathon.db.repository.DoctorRepository;
import com.ssafy.marathon.db.repository.UserRepository;
import com.ssafy.marathon.dto.request.user.DoctorReqDto;
import com.ssafy.marathon.dto.response.user.DoctorResDto;
import com.ssafy.marathon.dto.response.user.SignUpResDto;
import com.ssafy.marathon.service.patient.PatientSignServiceImpl;
import java.time.LocalDate;
import java.util.Collections;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class DoctorSignServiceImpl implements DoctorSignService {
    private final Logger LOGGER = LoggerFactory.getLogger(PatientSignServiceImpl.class);
    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;
    private final PasswordEncoder passwordEncoder;

    public DoctorSignServiceImpl(UserRepository userRepository, DoctorRepository doctorRepository,
        PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public SignUpResDto signUp(DoctorReqDto doctorReqDto) {
        LOGGER.info("[signUp] 의사 회원가입 정보 전달");
        Doctor doctor = Doctor.builder()
            .id(doctorReqDto.getId())
            .roles(Collections.singletonList("ROLE_DOCTOR"))
            .name(doctorReqDto.getName())
            .sex(doctorReqDto.isSex())
            .password(passwordEncoder.encode(doctorReqDto.getPassword()))
            .email(doctorReqDto.getEmail())
            .birthDate(doctorReqDto.getBirthDate())
            .registDate(LocalDate.now())
            .phone(doctorReqDto.getPhone())
            .license(doctorReqDto.getLicense())
            .degree(doctorReqDto.getDegree())
            .build();
        doctor.setImg("default.png");
        Doctor savedDoctor = (Doctor) doctorRepository.save(doctor);
        SignUpResDto signUpResDto;

        LOGGER.info("[signUp] userEntity 값이 들어왔는지 확인 후 결과값 주입");
        if (!savedDoctor.getName().isEmpty()) {
            LOGGER.info("[signUp] 정상 처리 완료");
            signUpResDto = SignUpResDto.builder().success(true).msg("회원가입 성공").build();
        } else {
            LOGGER.info("[signUp] 실패 처리 완료");
            signUpResDto = SignUpResDto.builder().success(false).msg("회원가입 실패").build();
        }
        return signUpResDto;
    }

    @Override
    public DoctorResDto getDoctor(Long seq) {
        Doctor doctor = doctorRepository.getBySeq(seq);
        DoctorResDto loadedDoctor = DoctorResDto.builder()
            .id(doctor.getId())
            .name(doctor.getName())
            .registDate(doctor.getRegistDate())
            .email(doctor.getEmail())
            .phone(doctor.getPhone())
            .img(doctor.getImg())
            .introduce(doctor.getIntroduce())
            .build();
        return loadedDoctor;
    }


}
