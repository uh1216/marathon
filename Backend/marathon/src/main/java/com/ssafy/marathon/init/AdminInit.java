package com.ssafy.marathon.init;

import com.ssafy.marathon.db.entity.user.Admin;
import com.ssafy.marathon.db.repository.AdminRepository;
import java.util.Collections;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class AdminInit {

    private final Logger LOGGER = LoggerFactory.getLogger(AdminInit.class);
    private final AdminRepository adminRepository;
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
    }
}
