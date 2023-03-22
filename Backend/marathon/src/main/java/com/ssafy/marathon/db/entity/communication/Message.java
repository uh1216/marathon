package com.ssafy.marathon.db.entity.communication;

import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@SuperBuilder
@Entity
@Table(name = "message")
public class Message extends Communication {

    private String content;
}
