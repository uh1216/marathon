package com.ssafy.marathon.db.entity.communication;

import com.ssafy.marathon.db.entity.user.User;
import java.time.LocalDateTime;
import javax.persistence.*;

import lombok.*;
import lombok.experimental.SuperBuilder;


@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@SuperBuilder
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn
@Entity
@Table(name = "communication")
public class Communication {

    @Id
    @GeneratedValue
    private Long seq;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_user_seq")
    private User sender;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_user_seq")
    private User receiver;

    private LocalDateTime dateTime;

    private Boolean checked;

    public void changeChecked() {
        this.checked = true;
    }
}
