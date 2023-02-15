package com.ssafy.marathon.dto.response.user;

import java.time.LocalDate;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@ToString
@EqualsAndHashCode(of = "seq")
public class UserResDto {

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


}
