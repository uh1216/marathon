package com.ssafy.marathon.dto.request.communication;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class MessageReqDto {

    private Long commuSeq;
    private Long receiverSeq;
    private String content;
    private boolean isNew;
}
