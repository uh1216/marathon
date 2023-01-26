package com.ssafy.marathon.dto.response.communication;

import java.time.LocalDateTime;
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
public class CommunicationResDto {

    private Long seq;
    private Long senderSeq;
    private Long reciverSeq;
    private LocalDateTime date;
    private boolean check;

}
