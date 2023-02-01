package com.ssafy.marathon.service.user;

import com.ssafy.marathon.controller.user.UserSignController;
import com.ssafy.marathon.db.entity.user.User;
import com.ssafy.marathon.db.repository.UserRepository;
import javax.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@PropertySource("classpath:application.properties")
@RequiredArgsConstructor
@Service
public class EmailService {

    private final UserRepository userRepository;

    private final JavaMailSender javaMailSender;
    private final PasswordEncoder passwordEncoder;
    private final Logger LOGGER = LoggerFactory.getLogger(UserSignController.class);

    public void sendEmailToFindId(String email) {
        User user = (User) userRepository.findByEmail(email).get();
        String id = user.getId();
        LOGGER.info("[sendEmailToFindId] 이메일 보내기 시작");
        String subject = "Marathon 입니다";
        String text = "회원님 아이디는" + id + " 입니다. ";
        MimeMessagePreparator msg = mimeMessage -> {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true,
                "UTF-8");
            mimeMessageHelper.setTo(email);
            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setText(text, true);
        };
        LOGGER.info("[sendEmail] msg 초기화 완료");
        javaMailSender.send(msg);
        LOGGER.info("javaMailSender.send");
    }

    public void sendEmailToFindPassword(String id, String email) throws Exception {
        User user = (User)userRepository.findById(id).get();
        if(!email.equals(user.getEmail())) throw new Exception();
        String password = passwordEncoder.encode(user.getPassword());
        LOGGER.info("[sendEmailToFindPassword] 이메일 보내기 시작");
        String subject = "Marathon 입니다";
        String text = "요청하신 패스워드는 " + password + " 입니다. ";
        MimeMessagePreparator msg = mimeMessage -> {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true,
                "UTF-8");
            mimeMessageHelper.setTo(email);
            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setText(text, true);
        };
        LOGGER.info("[sendEmail] msg 초기화 완료");
        javaMailSender.send(msg);
        LOGGER.info("javaMailSender.send");
    }
}
