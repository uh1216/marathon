package com.ssafy.marathon.controller.user;

import com.ssafy.marathon.dto.request.game.InteractionReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserGameController {
    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/text")
    public void sendMessage(InteractionReqDto interactionReqDto, SimpMessageHeaderAccessor accessor) {
        simpMessagingTemplate.convertAndSend("/app/text/" + interactionReqDto.getChannelId(), interactionReqDto);
    }
}
