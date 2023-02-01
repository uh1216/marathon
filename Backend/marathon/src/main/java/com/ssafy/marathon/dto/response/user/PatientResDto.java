package com.ssafy.marathon.dto.response.user;

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
public class PatientResDto extends UserResDto {

    private String mainPhone;
    private String mainRelationship;
    private String subPhone;
    private String subRelationship;
    private String img;

}
