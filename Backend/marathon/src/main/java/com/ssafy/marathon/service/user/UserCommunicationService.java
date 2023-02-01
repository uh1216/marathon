package com.ssafy.marathon.service.user;

import com.ssafy.marathon.db.entity.communication.Message;
import com.ssafy.marathon.db.entity.user.User;
import com.ssafy.marathon.db.repository.CommunicationRepository;
import com.ssafy.marathon.db.repository.UserRepository;
import com.ssafy.marathon.dto.request.communication.MessageReqDto;
import com.ssafy.marathon.dto.response.communication.CommunicationResDto;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserCommunicationService {

    private final UserRepository<User> userRepository;
    private final CommunicationRepository<Message> communicationRepository;

    public void sendMessage(Long senderSeq, MessageReqDto messageReqDto) {
        Optional<User> findSender = userRepository.findById(senderSeq);
        User sender = findSender.orElseThrow();

        Optional<User> findReceiver = userRepository.findById(messageReqDto.getReceiverSeq());
        User receiver = findReceiver.orElseThrow();

        Message message = Message.builder()
            .sender(sender)
            .receiver(receiver)
            .date(LocalDateTime.now())
            .checked(false)
            //새로운 메시지면 root를 0으로 지정
            .root((messageReqDto.isNew()) ? 0 : messageReqDto.getCommuSeq())
            .content(messageReqDto.getContent())
            .build();
        communicationRepository.save(message);
    }

    public Page<CommunicationResDto> getCommunicationPages(Long userSeq, int pageNum) {
        Optional<User> findUser = userRepository.findById(userSeq);
        User user = findUser.orElseThrow();

        PageRequest pageRequest = PageRequest.of(pageNum - 1, 10);

        Page<CommunicationResDto> communicationResDtoPages = communicationRepository.findByReceiver(
                user, pageRequest)
            .map(message -> CommunicationResDto.builder()
                .commuSeq(message.getSeq())
                .senderName(message.getSender().getName())
                .content(message.getContent())
                .date(message.getDate())
                .checked(message.getChecked())
                .build());
        return communicationResDtoPages;
    }

    public void UpdateCheck(Long commuSeq) {
        Optional<Message> findMessage = communicationRepository.findById(commuSeq);
        Message message = findMessage.orElseThrow();

        message.changeChecked();
    }

//    public List<UserResDto> findCanSendMessageUsers() {
//
//    }

    public int countUncheckedCommunication(Long userSeq) {
        Optional<User> findUser = userRepository.findById(userSeq);
        User user = findUser.orElseThrow();

        return communicationRepository.countByReceiverAndCheckedIsFalse(user);
    }
}
