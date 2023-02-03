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
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional
public class PatientSignServiceImpl implements PatientSignService {

    private final Logger LOGGER = LoggerFactory.getLogger(PatientSignServiceImpl.class);
    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final PasswordEncoder passwordEncoder;
    //프로젝트 내부에 저장
//    private static String projectPath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\image";
    //로컬 테스트 : 바탕화면 static 폴더에 저장
    private static String projectPath = "C:\\Users\\SSAFY\\Desktop\\static\\image";


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
            .img("default.PNG")
            .imgName("default.PNG")
            .imgPath(projectPath)
            .build();
        patient.setImg("default.PNG");
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

    @Override
    public void modifyPatient(Long seq, PatientReqDto patientReqDto, MultipartFile image)
        throws IOException {

        LOGGER.info("[modifyPatient] 환자정보 수정 시작");
        Patient patient = patientRepository.getBySeq(seq);
        patient.setPassword(passwordEncoder.encode(patientReqDto.getPassword()));
        patient.setEmail(patientReqDto.getEmail());
        patient.setPhone(patientReqDto.getPhone());
        patient.setMainPhone(patientReqDto.getMainPhone());
        patient.setMainRelationship(patientReqDto.getMainRelationship());
        patient.setSubPhone(patientReqDto.getSubPhone());
        patient.setSubRelationship(patientReqDto.getSubRelationship());
        LOGGER.info("[modifyPatient] 이미지 비교 시작");
        //이미지 url이 다르면 파일 저장하고 유저이미지 정보 수정
        if(patientReqDto.getImgName()!= patient.getImgName()) {
            //저장경로 지정
//            String projectPath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\image";
            //랜덤식별자 생성
            UUID uuid = UUID.randomUUID();
            //파일이름 설정
            String fileName = uuid + "_" + image.getOriginalFilename();
            //파일 생성
            File saveFile = new File(projectPath, fileName);
            //파일 저장
            image.transferTo(saveFile);
            //유저정보 변경
            patient.setImgName(fileName);
            patient.setImg(fileName);
            //바이트코드 생성
//            byte[] byte1 = Files.readAllBytes(saveFile.toPath());
//            byte[] base64 = Base64.getEncoder().encode(byte1);
//            String str1 = Base64.getEncoder().encodeToString(byte1);
//            patient.setImg(str1);
        }
        LOGGER.info("[modifyPatient] 환자정보 수정 시작");
        LOGGER.info("[modifyPatient] 환자정보 수정 시작");
    }


}
