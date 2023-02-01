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
<<<<<<< HEAD
    private LocalDateTime dateTime;
    private String content;
    private Long root;

    private String title;

    private String url;
=======
    private String content;
    private boolean isNew;
>>>>>>> 220fea88f4d053ee756363dd4ee84e5831451755
}
