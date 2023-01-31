package com.ssafy.marathon.db.repository;

import com.ssafy.marathon.db.entity.treatment.Reservation;
import com.ssafy.marathon.dto.response.treatment.DayOfReservationResDto;
import java.time.LocalDate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    int countByDateBetweenAndDoctor_Seq(LocalDate start, LocalDate end, Long seq);

    Reservation save(Reservation reservation);

    int countReservationByDate(LocalDate date);

    Reservation findByDateAndDoctor_Seq(LocalDate date, Long doctorSeq);
}
