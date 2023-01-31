package com.ssafy.marathon.service.doctor;

import com.ssafy.marathon.db.entity.treatment.Reservation;
import com.ssafy.marathon.db.repository.ReservationRepository;
import com.ssafy.marathon.db.repository.UserRepository;
import com.ssafy.marathon.dto.response.treatment.DayOfReservationResDto;
import com.ssafy.marathon.dto.response.treatment.DayOfTreatmentResDto;
import com.ssafy.marathon.dto.response.treatment.ReservationResDto;
import com.ssafy.marathon.util.MilliFunc;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TreatmentServiceImpl implements TreatmentService {

    private Logger logger = LoggerFactory.getLogger(TreatmentServiceImpl.class);

    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private UserRepository userRepository;

    // 해당 의사의 예약이 몇개인지 반환한다.
    @Override
    public int countRaws() { // 매개변수로 의사 넣을것
        LocalDate startDate = MilliFunc.getStartDate();
        LocalDate endDate = MilliFunc.getEndDate();

        return reservationRepository.countByDateBetweenAndDoctor_Seq(startDate, endDate, 1L);
    }

    //    예약이 없는 경우 의사의 예약을 채운다
    @Override
    public void makeEmptyReservation() { // 매개변수로 의사 넣을것
        Long milli = MilliFunc.startDayMilliSec();
        for (int i = 0; i < 21; i++) {
            LocalDate date = MilliFunc.makeDate(milli);
//            logger.info("현재" + i + "번째 반복중");
//            logger.info(reservationRepository.countReservationByDate(date) + "");
            if (0 == reservationRepository.countReservationByDate(date)) {
                Reservation rv = Reservation.builder().date(date).bitDate("00000000")
//                    doctor받아와야함
                    .doctor(userRepository.findDoctorBySeq(1L)).build();
//                logger.info(rv.toString());
                reservationRepository.save(rv);
            }
            milli += MilliFunc.DAYMILLIESEC;
        }
    }

    //    각 예약의 정보를 리스트로 만들어 반환한다.
    @Override
    public List<DayOfReservationResDto> makeReservationList(Long doctorSeq) { // 의사로 바꿀것? seq여도 되는가?
        List<DayOfReservationResDto> list = new ArrayList<DayOfReservationResDto>();
        Long milli = MilliFunc.startDayMilliSec();
        for (int i = 0; i < 21; i++) {
            LocalDate ld = MilliFunc.makeDate(milli);
//            logger.info(ld + ", " + doctorSeq + "<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
            Reservation reservation = reservationRepository.findByDateAndDoctor_Seq(ld, doctorSeq);

            DayOfReservationResDto reservationResDto = DayOfReservationResDto.builder()
                .reservationSeq(reservation.getSeq()).localDate(reservation.getDate())
                .bitDate(reservation.getBitDate()).build();
            list.add(reservationResDto);
            milli += MilliFunc.DAYMILLIESEC;
        }

        return list;
    }

    @Override
    public ReservationResDto makeReservationResDto() {

//        logger.info("test check 1");
        List<DayOfReservationResDto> list = makeReservationList(1L);

//        logger.info("test check 2");

        ReservationResDto reservationResDto = ReservationResDto.builder()
            .firstDateInfo(MilliFunc.startDayMilliSec()).list(list).build();
//        logger.info("test check 3");
        return reservationResDto;
    }


}
