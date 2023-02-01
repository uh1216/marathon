package com.ssafy.marathon.db.entity.communication;

import com.ssafy.marathon.db.entity.user.User;
import java.time.LocalDateTime;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;


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

    private LocalDateTime dateTime;

    private Boolean checked;

    public void changeChecked() {
        this.checked = true;
    }
}
