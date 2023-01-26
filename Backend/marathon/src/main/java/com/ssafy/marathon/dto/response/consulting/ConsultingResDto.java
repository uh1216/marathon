package com.ssafy.marathon.dto.response.consulting;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConsultingResDto {

    private String name;
    private LocalDate birthDate;
    private String email;
    private String phone1;
    private String Phone2;
    private String Phone2Relationship;
    private String Phone3;
    private String Phone3Relationship;
    private String description;
    private String getSickDate;
    private String hopeDate;
}
