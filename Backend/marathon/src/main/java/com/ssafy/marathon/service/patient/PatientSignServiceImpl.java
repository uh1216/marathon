package com.ssafy.marathon.service.patient;

import com.ssafy.marathon.db.entity.user.Patient;
import com.ssafy.marathon.db.repository.PatientRepository;
import com.ssafy.marathon.db.repository.UserRepository;
import com.ssafy.marathon.dto.request.user.PatientReqDto;
import com.ssafy.marathon.dto.request.user.SignInReqDto;
import com.ssafy.marathon.dto.request.user.UserReqDto;
import com.ssafy.marathon.dto.response.user.PatientResDto;
import com.ssafy.marathon.dto.response.user.SignInResDto;
import com.ssafy.marathon.dto.response.user.SignUpResDto;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PatientSignServiceImpl implements PatientSignService {

    private final Logger LOGGER = LoggerFactory.getLogger(PatientSignServiceImpl.class);
    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final PasswordEncoder passwordEncoder;

    public PatientSignServiceImpl(UserRepository userRepository,
        PatientRepository patientRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public SignUpResDto signUp(PatientReqDto patientReqDto) {

        LOGGER.info("[PatientSignServiceImpl.signUp] 환자 회원가입 정보 전달");
        Patient patient = Patient.builder()
            .id(patientReqDto.getId())
            .roles(Collections.singletonList("ROLE_PATIENT"))
            .name(patientReqDto.getName())
            .password(passwordEncoder.encode(patientReqDto.getPassword()))
            .email(patientReqDto.getEmail())
            .sex(patientReqDto.isSex())
            .birthDate(patientReqDto.getBirthDate())
            .registDate(LocalDate.now())
            .phone(patientReqDto.getPhone())
            .mainPhone(patientReqDto.getMainPhone())
            .mainRelationship(patientReqDto.getMainRelationship())
            .subPhone(patientReqDto.getSubPhone())
            .subRelationship(patientReqDto.getSubRelationship())
            .build();
        patient.setImg("default.png");
        Patient savedPatient = (Patient) patientRepository.save(patient);
        SignUpResDto signUpResDto;

        LOGGER.info("[signUp] userEntity 값이 들어왔는지 확인 후 결과값 주입");
        if (!savedPatient.getName().isEmpty()) {
            LOGGER.info("[signUp] 정상 처리 완료");
            signUpResDto = SignUpResDto.builder().success(true).msg("회원가입 성공").build();
        } else {
            LOGGER.info("[signUp] 실패 처리 완료");
            signUpResDto = SignUpResDto.builder().success(false).msg("회원가입 실패").build();
        }
        return signUpResDto;
    }

    @Override
    public PatientResDto getPatient(Long seq) {
        Patient patient = patientRepository.getBySeq(seq);
        PatientResDto loadedPatient = PatientResDto.builder()
            .id(patient.getId())
            .name(patient.getName())
            .registDate(patient.getRegistDate())
            .email(patient.getEmail())
            .phone(patient.getPhone())
            .img(patient.getImg())
            .mainPhone(patient.getMainPhone())
            .mainRelationship(patient.getMainRelationship())
            .subPhone(patient.getSubPhone())
            .subRelationship(patient.getSubRelationship())
            .build();
        return loadedPatient;
    }


}
