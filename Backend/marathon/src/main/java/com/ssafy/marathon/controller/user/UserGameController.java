package com.ssafy.marathon.controller.user;

import com.ssafy.marathon.dto.request.game.InteractionReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserGameController {
    private final SimpMessagingTemplate simpMessagingTemplate;

//    채팅
    @MessageMapping("/chat")
    public void sendChat(@RequestBody InteractionReqDto interactionReqDto, SimpMessageHeaderAccessor accessor) {
        System.out.println("--------------------");
        System.out.println(interactionReqDto.getContent());
        System.out.println("/chat/" + interactionReqDto.getChannelId());
        simpMessagingTemplate.convertAndSend("/chat/" + interactionReqDto.getChannelId(), interactionReqDto);
//        simpMessagingTemplate.convertAndSend("/topic/roomId" + interactionReqDto.getChannelId(), interactionReqDto);
    }

//    스케치보드
    @MessageMapping("/sketch")
    public void sendSketch(@RequestBody InteractionReqDto interactionReqDto, SimpMessageHeaderAccessor accessor) {
        System.out.println("--------------------");
        System.out.println(interactionReqDto.getContent());
        System.out.println("/sketch/" + interactionReqDto.getChannelId());
        simpMessagingTemplate.convertAndSend("/sketch/" + interactionReqDto.getChannelId(), interactionReqDto);
//        simpMessagingTemplate.convertAndSend("/topic/roomId" + interactionReqDto.getChannelId(), interactionReqDto);
    }

//    무작위 질문
    @MessageMapping("/question")
    public void sendQuestion(@RequestBody InteractionReqDto interactionReqDto, SimpMessageHeaderAccessor accessor) {
        System.out.println("--------------------");
        System.out.println(interactionReqDto.getContent());
        System.out.println("/question/" + interactionReqDto.getChannelId());
        simpMessagingTemplate.convertAndSend("/question/" + interactionReqDto.getChannelId(), interactionReqDto);
//        simpMessagingTemplate.convertAndSend("/topic/roomId" + interactionReqDto.getChannelId(), interactionReqDto);
    }

//    프리셋
    @MessageMapping("/preset")
    public void sendPreset(@RequestBody InteractionReqDto interactionReqDto, SimpMessageHeaderAccessor accessor) {
        System.out.println("--------------------");
        System.out.println(interactionReqDto.getContent());
        System.out.println("/preset/" + interactionReqDto.getChannelId());
        simpMessagingTemplate.convertAndSend("/preset/" + interactionReqDto.getChannelId(), interactionReqDto);
//        simpMessagingTemplate.convertAndSend("/topic/roomId" + interactionReqDto.getChannelId(), interactionReqDto);
    }

//    그림 보드
    @MessageMapping("/image")
    public void sendImage(@RequestBody InteractionReqDto interactionReqDto, SimpMessageHeaderAccessor accessor) {
        System.out.println("--------------------");
        System.out.println(interactionReqDto.getContent());
        System.out.println("/image/" + interactionReqDto.getChannelId());
        simpMessagingTemplate.convertAndSend("/image/" + interactionReqDto.getChannelId(), interactionReqDto);
//        simpMessagingTemplate.convertAndSend("/topic/roomId" + interactionReqDto.getChannelId(), interactionReqDto);
    }

//    끝말잇기
    @MessageMapping("/wordChain")
    public void sendWordChain(@RequestBody InteractionReqDto interactionReqDto, SimpMessageHeaderAccessor accessor) {
        System.out.println("--------------------");
        System.out.println(interactionReqDto.getContent());
        System.out.println("/wordChain/" + interactionReqDto.getChannelId());
        simpMessagingTemplate.convertAndSend("/wordChain/" + interactionReqDto.getChannelId(), interactionReqDto);
//        simpMessagingTemplate.convertAndSend("/topic/roomId" + interactionReqDto.getChannelId(), interactionReqDto);
    }

    //    끝말잇기
    @MessageMapping("/changeInteraction")
    public void sendChangeInteraction(@RequestBody InteractionReqDto interactionReqDto, SimpMessageHeaderAccessor accessor) {
        System.out.println("--------------------");
        System.out.println(interactionReqDto.getContent());
        System.out.println("/changeInteraction/" + interactionReqDto.getChannelId());
        simpMessagingTemplate.convertAndSend("/changeInteraction/" + interactionReqDto.getChannelId(), interactionReqDto);
//        simpMessagingTemplate.convertAndSend("/topic/roomId" + interactionReqDto.getChannelId(), interactionReqDto);
    }
}
