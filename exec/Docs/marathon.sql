create table board
(
    seq         bigint       not null
        primary key,
    content     varchar(255) null,
    regist_date datetime(6)  null,
    title       varchar(255) null,
    view_cnt    int          not null
);

create table consulting
(
    consulting_seq      bigint       not null
        primary key,
    birth_date          date         null,
    checked             bit          not null,
    description         varchar(255) null,
    email               varchar(255) null,
    hope_date           date         null,
    name                varchar(255) null,
    phone1              varchar(255) null,
    phone2              varchar(255) null,
    phone2_relationship varchar(255) null,
    phone3              varchar(255) null,
    phone3_relationship varchar(255) null,
    sex                 bit          not null,
    sick_date           date         null
);

create table game_category
(
    seq  bigint       not null
        primary key,
    name varchar(255) null
);

create table hibernate_sequence
(
    next_val bigint null
);

create table user
(
    dtype       varchar(31)  not null,
    seq         bigint       not null
        primary key,
    birth_date  date         null,
    email       varchar(255) null,
    id          varchar(255) not null,
    img         varchar(255) null,
    kakao       varchar(255) null,
    name        varchar(255) null,
    password    varchar(255) not null,
    phone       varchar(255) null,
    regist_date date         null,
    sex         bit          not null,
    constraint UK_8qtpnv06elxuryeuv1ac4ximm
        unique (id)
);

create table admin
(
    seq bigint not null
        primary key,
    constraint FKrf8rklbtq8ymctcrct4iojg55
        foreign key (seq) references user (seq)
);

create table communication
(
    dtype             varchar(31) not null,
    seq               bigint      not null
        primary key,
    checked           bit         null,
    date_time         datetime(6) null,
    receiver_user_seq bigint      null,
    sender_user_seq   bigint      null,
    constraint FK5lc4d9rikoppmmk8uc1j9pmrg
        foreign key (receiver_user_seq) references user (seq),
    constraint FKsjqc9wrpj1qfpbb4rtxojlfaq
        foreign key (sender_user_seq) references user (seq)
);

create table alarm
(
    link varchar(255) null,
    seq  bigint       not null
        primary key,
    constraint FK7mwdjsoxywgro1e8t32crbert
        foreign key (seq) references communication (seq)
);

create table doctor
(
    degree    varchar(255) null,
    introduce varchar(255) null,
    license   varchar(255) null,
    seq       bigint       not null
        primary key,
    constraint FKgpq1ueuahpuehvsgxb7ighlxa
        foreign key (seq) references user (seq)
);

create table message
(
    content varchar(255) null,
    seq     bigint       not null
        primary key,
    constraint FK2eeo7rnl74mxk58dy3rugax28
        foreign key (seq) references communication (seq)
);

create table patient
(
    main_phone        varchar(255) null,
    main_relationship varchar(255) null,
    sub_phone         varchar(255) null,
    sub_relationship  varchar(255) null,
    seq               bigint       not null
        primary key,
    constraint FKjglhfj7crl4objyb7r8v2nsbb
        foreign key (seq) references user (seq)
);

create table game_score
(
    seq         bigint       not null
        primary key,
    correct     int          not null,
    date        date         null,
    difficulty  varchar(255) null,
    game_type   int          not null,
    time        time         null,
    patient_seq bigint       null,
    constraint FKjsm8tofffrhym7mxkfw2iii3j
        foreign key (patient_seq) references patient (seq)
);

create table history
(
    seq         bigint       not null
        primary key,
    date        date         null,
    feedback    varchar(255) null,
    time        time         null,
    video_url   varchar(255) null,
    doctor_seq  bigint       null,
    patient_seq bigint       null,
    constraint FKc0nartgowefadbl5rdb2mrtoe
        foreign key (patient_seq) references patient (seq),
    constraint FKpvrp5251n9iacr2al1fsm1xrj
        foreign key (doctor_seq) references doctor (seq)
);

create table reservation
(
    seq        bigint       not null
        primary key,
    bit_date   varchar(255) null,
    date       date         null,
    doctor_seq bigint       null,
    constraint FKjlkh1aq9nroavwwbov7nfaelv
        foreign key (doctor_seq) references doctor (seq)
);

create table treatment
(
    seq         bigint not null
        primary key,
    date        date   null,
    time        time   null,
    doctor_seq  bigint null,
    patient_seq bigint null,
    constraint FKck2jpojymamb9lmkgeevttmfr
        foreign key (patient_seq) references patient (seq),
    constraint FKr95g42n5r0wew4i3nxfbau5mm
        foreign key (doctor_seq) references doctor (seq)
);

create table user_roles
(
    user_seq bigint       not null,
    roles    varchar(255) null,
    constraint FKh3ddphs1acd3qg1mcawkfw0m6
        foreign key (user_seq) references user (seq)
);


