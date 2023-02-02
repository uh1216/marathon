package com.ssafy.marathon.controller.user;

import com.ssafy.marathon.config.security.JwtTokenProvider;
import com.ssafy.marathon.dto.request.communication.MessageReqDto;
import com.ssafy.marathon.dto.response.communication.CommunicationResDto;
import com.ssafy.marathon.dto.response.communication.UserCommuCntResDto;
import com.ssafy.marathon.service.user.UserCommunicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user-commu")
public class UserCommunicationController {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserCommunicationService userCommunicationService;

    @PostMapping("/message")
    public void SendMessage(@RequestHeader("Access-Token") String accessToken,
        @RequestBody MessageReqDto messageReqDto) {
        Long userSeq = jwtTokenProvider.getUserSeq(accessToken);

        userCommunicationService.sendMessage(userSeq, messageReqDto);
    }

    @GetMapping("/list")
    public Page<CommunicationResDto> getCommunicationResDtoPages(
        @RequestHeader("Access-Token") String accessToken, @RequestParam int pageNum) {
        Long userSeq = jwtTokenProvider.getUserSeq(accessToken);
        return userCommunicationService.getCommunicationPages(userSeq, pageNum);
    }

    @PutMapping("/message/{commuSeq}")
    public void updateCheck(@PathVariable Long commuSeq) {
        userCommunicationService.UpdateCheck(commuSeq);
    }

    @GetMapping("/count")
    public UserCommuCntResDto countUncheckedCommunication(@RequestHeader("Access-Token") String accessToken) {
        Long userSeq = jwtTokenProvider.getUserSeq(accessToken);

        return userCommunicationService.countUncheckedCommunication(userSeq);
    }
}
