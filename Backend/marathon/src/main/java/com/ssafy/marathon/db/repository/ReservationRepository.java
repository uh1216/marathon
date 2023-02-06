package com.ssafy.marathon.db.repository;

import com.ssafy.marathon.db.entity.treatment.Reservation;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    int countByDateBetweenAndDoctor_Seq(LocalDate start, LocalDate end, Long seq);

    Reservation save(Reservation reservation);

    int countReservationByDateAndDoctor_Seq(LocalDate date, Long doctorSeq);

    Reservation findByDateAndDoctor_Seq(LocalDate date, Long doctorSeq);

    Reservation findBySeq(Long seq);

    List<Reservation> findAllByDateBetweenAndDoctor_Seq(LocalDate start, LocalDate end, Long seq);
}
