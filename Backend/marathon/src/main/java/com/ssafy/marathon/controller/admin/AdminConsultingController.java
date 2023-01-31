package com.ssafy.marathon.controller.admin;

import com.ssafy.marathon.dto.response.consulting.ConsultingResDto;
import com.ssafy.marathon.service.admin.AdminConsultingService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("admin-consult")
public class AdminConsultingController {

    private final AdminConsultingService adminConsultingService;

    @GetMapping("/detail/{consultingSeq}")
    public ConsultingResDto getDetailConsulting(@PathVariable Long consultingSeq) {
        return adminConsultingService.getDetailConsulting(consultingSeq);
    }

    @GetMapping("/list")
    public Page<ConsultingResDto> getConsultingPages(@RequestParam int pageNum) {
        return adminConsultingService.getConsultingPages(pageNum);
    }

    @PutMapping("/detail/{consultingSeq}")
    public void checkConsulting(@PathVariable Long consultingSeq) {
        adminConsultingService.checkConsulting(consultingSeq);
    }
}
