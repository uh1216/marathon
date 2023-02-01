package com.ssafy.marathon.util;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;

public class MilliFunc {

    public static final int DAYMILLIESEC = 1000 * 60 * 60 * 24;

    /*
            1000 * 60 * 60 * 24 => 하루
            LocalDate.now().toEpochDay() + (1 - LocalDate.now().getDayOfWeek().getValue()) => 이번주의 epoch의 첫 월요일
            두개 곱해서 반환
    */
    public static Long startDayMilliSec() {
        return (LocalDate.now().toEpochDay() + (1 - LocalDate.now().getDayOfWeek().getValue()))
            * DAYMILLIESEC;
    }

    public static Long lastDayMilliSec() {
        return startDayMilliSec() + DAYMILLIESEC * 20;
    }

    public static LocalDate getStartDate() {
        return LocalDate.ofInstant(Instant.ofEpochMilli(startDayMilliSec()),
            ZoneId.systemDefault());
    }

    public static LocalDate getEndDate() {
        return LocalDate.ofInstant(Instant.ofEpochMilli(lastDayMilliSec()), ZoneId.systemDefault());
    }

    public static LocalDate makeDate(Long millisec) {
        return LocalDate.ofInstant(Instant.ofEpochMilli(millisec), ZoneId.systemDefault());
    }

}
