package com.ssafy.marathon.controller.doctor;


import com.ssafy.marathon.service.doctor.TreatmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/doctor-treatment")
public class DoctorTreatmentController {

    @Autowired
    public TreatmentService treatmentService;

    @GetMapping("/table")
    public ResponseEntity<?> getTables() {
        int cnt = treatmentService.countRaws();

        if(cnt != 21){
            treatmentService.makeEmptyReservation();
        }

        return new ResponseEntity<Integer>(cnt, HttpStatus.OK);
    }

}
