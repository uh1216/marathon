package com.ssafy.marathon.db.entity.communication;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name = "message")
public class Message extends Communication {

//    @Id
//    @GeneratedValue
//    private Long messageSeq;

    private Long messageRoot;

    private String messageContent;
}
