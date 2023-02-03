package com.ssafy.marathon.dto.response.user;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
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
    private String imgName;
    private String imgPath;
    private LocalDate registDate;


}
