package com.ssafy.marathon.dto.response.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

// 예제 13.30
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@SuperBuilder
public class SignInResDto extends SignUpResDto {

    private String accessToken;


}