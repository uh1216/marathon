package com.ssafy.marathon.controller.doctor;

import com.ssafy.marathon.dto.request.communication.AlarmReqDto;
import com.ssafy.marathon.service.doctor.DoctorCommunicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/doctor-commu")
public class DoctorCommunicationController {

    private final DoctorCommunicationService doctorCommunicationService;

    @PostMapping("/alarm")
    public void createAlarm(AlarmReqDto alarmReqDto) {
        doctorCommunicationService.CreateAlarm(alarmReqDto);
    }
}
