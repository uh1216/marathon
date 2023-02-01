package com.ssafy.marathon.controller.patient;

import com.ssafy.marathon.config.security.JwtTokenProvider;
import com.ssafy.marathon.dto.response.consulting.ConsultingResDto;
import com.ssafy.marathon.service.patient.PatientConsultingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/patient-consult")
public class PatientConsultingController {

    private final PatientConsultingService patientConsultingService;
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping("/form")
    public ConsultingResDto getPatientForm(@RequestHeader("Access-Token") String accessToken) {
        Long userSeq = jwtTokenProvider.getUserSeq(accessToken);

        return patientConsultingService.getConsultingForm(userSeq);
    }

}
