package com.ssafy.marathon.dto.request.user;

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
public class PatientReqDto {

    private Long seq;
    private String id;
    private String password;
    private String name;
    private String phone;
    private Date birthDate;
    private boolean guardian;
    private String mainPhone;
    private String mainRelationship;
    private String subPhone;
    private String subRelationship;
    private String img;

}
