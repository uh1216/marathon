package com.ssafy.marathon.dto.request.user;

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
public class PatientReqDto extends UserReqDto{

    private String mainPhone;
    private String mainRelationship;
    private String subPhone;
    private String subRelationship;
    private String img;

}
