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
            .registDate(LocalDate.now())
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
            .birthDate(LocalDate.of(1996,11,12))
            .introduce("젊고 건강한 분들도 영양제를 매일 챙겨 먹고 운동을 하며 몸을 꾸준히 관리하듯이, 재활 또한 단기간이 아닌 일상 속에서의 꾸준한 관리가 필요하다고 생각합니다. 단순히 재활 수업에만 집중하는 것이 아니라 파트너로 다가가겠습니다.")
            .img("https://d1v10kml6l14kq.cloudfront.net/dusgkr.png")
            .email("dldusgkr788@gmail.com")
            .phone("01012341234")
            .build();
        doctorRepository.save(doctor1);
        Doctor doctor2 = Doctor.builder()
            .id("wjdtn")
            .password(passwordEncoder.encode("ssafy"))
            .roles(Collections.singletonList("ROLE_DOCTOR"))
            .name("김정수").img(defaultImg)
            .sex(true)
            .registDate(LocalDate.now())
            .birthDate(LocalDate.of(1996,11,12))
            .email("kjskjs356@gmail.com")
            .phone("01012341234")
            .introduce("수업이 화상으로 진행되다 보니 가끔 환자분들의 미세한 표정이나 상태들이 잘 보이지 않아 어려운 점은 있습니다. 하지만 그것보다 훨씬 많은 이점이 있다고 생각합니다. 높은 상호작용으로 대면과 같은 효과를 만들어 나가겠습니다!")
            .img("https://d1v10kml6l14kq.cloudfront.net/wjdtn.png")
            .build();
        doctorRepository.save(doctor2);
        Doctor doctor3 = Doctor.builder()
            .id("wnsdk")
            .password(passwordEncoder.encode("ssafy"))
            .roles(Collections.singletonList("ROLE_DOCTOR"))
            .name("최준아").img(defaultImg)
            .sex(false)
            .registDate(LocalDate.now())
            .birthDate(LocalDate.of(1996,11,12))
            .email("jn307742@gmail.com")
            .phone("01012341234")
            .introduce("체력적, 시간상으로 재활을 꾸준히 받기 힘드신 분들도 장소에 구애받지 않고 전자기기만 있으면 손쉽게 반복해서 복습을 할 수 있다는 건 큰 이점 입니다! 저도 이 안에서 앞으로도 더 잘하고 싶은 욕심이 있고 적극적으로 소통하겠습니다.")
            .img("https://d1v10kml6l14kq.cloudfront.net/wnsdk.png")
            .build();
        doctorRepository.save(doctor3);
        Patient patient1 = Patient.builder()
            .id("dndgml")
            .password(passwordEncoder.encode("ssafy"))
            .roles(Collections.singletonList("ROLE_PATIENT"))
            .name("조웅희").img(defaultImg)
            .sex(true)
            .registDate(LocalDate.now())
            .birthDate(LocalDate.of(1996,11,12))
            .email("paul9512@gmail.com")
            .phone("01012341234")
            .mainPhone("01023452345")
            .mainRelationship("부모")
            .img("https://d1v10kml6l14kq.cloudfront.net/dndgml.png")
            .build();
        patientRepository.save(patient1);
        Patient patient2 = Patient.builder()
            .id("ghtks")
            .password(passwordEncoder.encode("ssafy"))
            .roles(Collections.singletonList("ROLE_PATIENT"))
            .name("윤호산").img(defaultImg)
            .sex(true)
            .registDate(LocalDate.now())
            .email("yoonhosan@naver.com")
            .birthDate(LocalDate.of(1996,11,12))
            .phone("01012341234")
            .mainPhone("01023452345")
            .mainRelationship("부모")
            .img("https://d1v10kml6l14kq.cloudfront.net/ghtks.png")
            .build();
        patientRepository.save(patient2);
        Patient patient3 = Patient.builder()
            .id("ehddus")
            .password(passwordEncoder.encode("ssafy"))
            .roles(Collections.singletonList("ROLE_PATIENT"))
            .name("김동연").img(defaultImg)
            .sex(true)
            .registDate(LocalDate.now())
            .birthDate(LocalDate.of(1996,11,12))
            .email("eastflow815@gmail.com")
            .phone("01012341234")
            .mainPhone("01023452345")
            .mainRelationship("부모")
            .img("https://d1v10kml6l14kq.cloudfront.net/ehddus.png")
            .build();
        patientRepository.save(patient3);
    }
}
