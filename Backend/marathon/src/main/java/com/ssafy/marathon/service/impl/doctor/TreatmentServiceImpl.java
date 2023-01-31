package com.ssafy.marathon.service.impl.doctor;

import com.ssafy.marathon.db.entity.treatment.Reservation;
import com.ssafy.marathon.db.repository.ReservationRepository;
import com.ssafy.marathon.service.doctor.TreatmentService;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TreatmentServiceImpl implements TreatmentService {

    private static final int DAYMILLIESEC = 1000 * 60 * 60 * 24;
    @Autowired
    private ReservationRepository reservationRepository;

    @Override
    public int countRaws() {
/*
        1000 * 60 * 60 * 24 => 하루
        LocalDate.now().toEpochDay() + (1 - LocalDate.now().getDayOfWeek().getValue()) => 이번주의 epoch의 첫 월요일
        두개 곱해서 반환
*/
        Long startMilli =
            (LocalDate.now().toEpochDay() + (1 - LocalDate.now().getDayOfWeek().getValue()))
                * DAYMILLIESEC;
        Long endMilli = startMilli + DAYMILLIESEC * 20;

        LocalDate startDate = LocalDate.ofInstant(Instant.ofEpochMilli(startMilli),
            ZoneId.systemDefault());
        LocalDate endDate = LocalDate.ofInstant(Instant.ofEpochMilli(endMilli),
            ZoneId.systemDefault());

        return reservationRepository.countByDateBetweenAndDoctor_Seq(startDate, endDate, 1L);
//        return 0;
    }

    @Override
    public void makeEmptyReservation() {
        Long milli =
            (LocalDate.now().toEpochDay() + (1 - LocalDate.now().getDayOfWeek().getValue()))
                * DAYMILLIESEC;
        for (int i = 0; i < 21; i++) {
            LocalDate date = LocalDate.ofInstant(Instant.ofEpochMilli(milli),
                ZoneId.systemDefault());
//            if (0 == reservationRepository.countReservationByDate(date)) {
//                Reservation rv = Reservation.builder()
//                    .date(date)
//                    .bitDate("00000000")
////                    doctor받아와야함
//                    .doctor(?)
//                .build();
//                reservationRepository.save(rv);
//            }
            milli += DAYMILLIESEC;
        }
    }
}
