package com.ssafy.marathon.db.entity.user;

import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "patient")
public class Patient extends User {

    private String mainPhone;
    private String mainRelationship;
    private String subPhone;
    private String subRelationship;
}
