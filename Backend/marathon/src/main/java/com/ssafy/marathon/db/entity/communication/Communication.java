package com.ssafy.marathon.db.entity.communication;

import com.ssafy.marathon.db.entity.user.User;
import java.time.LocalDateTime;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn
@Entity
@Table(name = "communication")
public class Communication {

    @Id
    @GeneratedValue
    private Long seq;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "sender_user_seq")
    private User sender;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "receiver_user_seq")
    private User receiver;

    private LocalDateTime date;

    private Boolean checked;
}
