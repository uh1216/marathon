package com.ssafy.marathon.dto.response.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@SuperBuilder
public class SignUpResDto {

    private boolean success;

    private String msg;

}