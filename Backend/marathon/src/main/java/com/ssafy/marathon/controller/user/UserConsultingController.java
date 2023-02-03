package com.ssafy.marathon.controller.user;

import com.ssafy.marathon.dto.request.consulting.ConsultingReqDto;
import com.ssafy.marathon.service.user.UserConsultingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("user-consult")
public class UserConsultingController {

    private final UserConsultingService userConsultingService;

    @PostMapping("/apply")
    public void CreateConsulting(@RequestBody ConsultingReqDto consultingReqDto) {
        userConsultingService.createConsulting(consultingReqDto);
    }
}
