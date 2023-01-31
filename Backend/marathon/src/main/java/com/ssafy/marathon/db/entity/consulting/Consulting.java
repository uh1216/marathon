package com.ssafy.marathon.db.entity.consulting;

import java.time.LocalDate;
import javax.persistence.Column;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "consulting")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Consulting {

    @Id
    @GeneratedValue
    private Long seq;
    private String name;
    private char sex;
    private LocalDate birthDate;
    private String email;
    private String phone1;
    private String phone2;
    @Column(name = "phone2_relationship")
    private String phone2Relationship;
    private String phone3;
    @Column(name = "phone3_relationship")
    private String phone3Relationship;
    private String sickDate;
    private String description;
    private LocalDateTime hopeDate;
    private boolean checked;
}
