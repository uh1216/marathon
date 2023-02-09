package com.ssafy.marathon.controller.user;

import com.ssafy.marathon.dto.request.game.InteractionReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserGameController {
    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/hello")
    public void sendMessage(@RequestBody InteractionReqDto interactionReqDto, SimpMessageHeaderAccessor accessor) {
        System.out.println("--------------------");
        System.out.println(interactionReqDto.getContent());
        simpMessagingTemplate.convertAndSend("/topic/roomId", interactionReqDto);
//        simpMessagingTemplate.convertAndSend("/topic/roomId" + interactionReqDto.getChannelId(), interactionReqDto);
    }
}
