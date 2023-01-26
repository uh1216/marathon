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
    @JoinColumn(name = "reciver_user_seq")
    private User reciver;

    /*
        java.sql.Date는 JDBC등을 이용해서 데이터베이스에 격납된 날짜나 시각정보를
        데이터로서 추출하거나 데이터베이스에 격납할 때의 영역으로 사용한다.
        문자열 형식이 "2008-12-30 12:30:20" 와 같은 형태의 데이터에 특화해서 사용하는데에 적합.
        연월일시분초등의 요소를 따로 따로 분리하지 않고 하나의 정보로서 다룬다.
    */
    private LocalDateTime date;

    private Boolean checked;
}
