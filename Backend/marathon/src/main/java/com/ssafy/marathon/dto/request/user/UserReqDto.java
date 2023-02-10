package com.ssafy.marathon.dto.request.user;

import java.time.LocalDate;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@ToString
public class UserReqDto {

    private Long seq;
    private String role;
    private String id;
    private String password;
    private String name;
    private boolean sex;
    private String email;
    private String phone;
    private LocalDate birthDate;
    private String img;
    private LocalDate registDate;
    private String kakao;

}
