package com.ssafy.marathon.db.entity.consulting;

import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity
@Table(name = "consulting")
public class Consulting {

    @Id
    @GeneratedValue
    private Long consultingSeq;
    private String name;
    private boolean sex;
    private LocalDate birthDate;
    private String email;
    private String phone1;
    private String phone2;
    @Column(name = "phone2_relationship")
    private String phone2Relationship;
    private String phone3;
    @Column(name = "phone3_relationship")
    private String phone3Relationship;
    @Nullable
    private LocalDate sickDate;
    private String description;
    private LocalDate hopeDate;
    private boolean checked;

    public void changeChecked() {
        this.checked = !this.checked;
    }
}
