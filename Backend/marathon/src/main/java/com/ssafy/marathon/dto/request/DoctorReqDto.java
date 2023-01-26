package com.ssafy.marathon.dto.request;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class DoctorReqDto {

    private Long seq;
    private String id;
    private String password;
    private String name;
    private String phone;
    private Date birthDate;
    private String license;
    private String degree;
    private String introduce;
    private String img;

}
