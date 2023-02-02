package com.ssafy.marathon.service.user;

import com.ssafy.marathon.db.entity.communication.Message;
import com.ssafy.marathon.db.entity.user.User;
import com.ssafy.marathon.db.repository.CommunicationRepository;
import com.ssafy.marathon.db.repository.TreatmentRepository;
import com.ssafy.marathon.db.repository.UserRepository;
import com.ssafy.marathon.dto.request.communication.MessageReqDto;
import com.ssafy.marathon.dto.response.communication.CommunicationResDto;
import com.ssafy.marathon.dto.response.communication.UserCommuCntResDto;
import com.ssafy.marathon.dto.response.user.UserResDto;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
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
    private final TreatmentRepository treatmentRepository;

    public void sendMessage(Long senderSeq, MessageReqDto messageReqDto) {
        Optional<User> findSender = userRepository.findById(senderSeq);
        User sender = findSender.orElseThrow();

        Optional<User> findReceiver = userRepository.findById(messageReqDto.getReceiverSeq());
        User receiver = findReceiver.orElseThrow();

        Message message = Message.builder()
            .sender(sender)
            .receiver(receiver)
            .dateTime(LocalDateTime.now())
            .checked(false)
            .content(messageReqDto.getContent())
            .build();
        communicationRepository.save(message);
    }

    public Page<CommunicationResDto> getCommunicationPages(Long userSeq, int pageNum) {
        Optional<User> findUser = userRepository.findById(userSeq);
        User user = findUser.orElseThrow();

        PageRequest pageRequest = PageRequest.of(pageNum - 1, 10);

        Page<CommunicationResDto> communicationResDtoPages = communicationRepository.findAllByReceiverOrderByCheckedAscDateTimeDesc(
                user, pageRequest)
            .map(message -> CommunicationResDto.builder()
                .commuSeq(message.getSeq())
                .senderName(message.getSender().getName())
                .content(message.getContent())
                .date(message.getDateTime())
                .checked(message.getChecked())
                .build());
        return communicationResDtoPages;
    }

    public void UpdateCheck(Long commuSeq) {
        Optional<Message> findMessage = communicationRepository.findById(commuSeq);
        Message message = findMessage.orElseThrow();

        message.changeChecked();
    }

    public List<UserResDto> findCanSendMessageUsers(Long userSeq, String userRole,
        MessageReqDto messageReqDto) {
        List<UserResDto> userResDtoList = new ArrayList<>();

        if (!messageReqDto.isNew()) {
            Optional<Message> findMessage = communicationRepository.findById(
                messageReqDto.getCommuSeq());
            Message beforeMessage = findMessage.orElseThrow();

            Optional<User> findSender = userRepository.findById(beforeMessage.getSender().getSeq());
            User sender = findSender.orElseThrow();

            userResDtoList.add(UserResDto.builder()
                .img(sender.getImg())
                .name(sender.getName())
                .id(sender.getId())
                .build());
        } else if (userRole.equals("Admin")) {
            userResDtoList = userRepository.findAll()
                .stream()
                .map(user -> UserResDto.builder()
                    .img(user.getImg())
                    .name(user.getName())
                    .id(user.getId())
                    .build()).collect(Collectors.toList());
        } else {
//            treatmentRepository.findAllById();
        }

        return userResDtoList;
    }

    public UserCommuCntResDto countUncheckedCommunication(Long userSeq) {
        Optional<User> findUser = userRepository.findById(userSeq);
        User user = findUser.orElseThrow();

        int count = communicationRepository.countByReceiverAndCheckedIsFalse(user);

        UserCommuCntResDto userCommuCntResDto = UserCommuCntResDto.builder()
            .count(count)
            .build();
        return userCommuCntResDto;
    }
}
