package com.bootcamp107.transactionservice.controller;
import com.bootcamp107.transactionservice.dto.CreateBeneficiary;
import com.bootcamp107.transactionservice.dto.GetBeneficiary;
import com.bootcamp107.transactionservice.service.IBeneficiaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/transactions/beneficiaries/")
public class BeneficiaryController {

    @Autowired
    private IBeneficiaryService beneficiaryService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<GetBeneficiary>> getBeneficiaryByUserId(@PathVariable UUID userId) {
        return new ResponseEntity<>(beneficiaryService.getAllBeneficiariesByUserId(userId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<GetBeneficiary> saveBeneficiary(@RequestBody CreateBeneficiary beneficiary) {
        return new ResponseEntity<>(beneficiaryService.saveBeneficiary(beneficiary), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<GetBeneficiary>> getAllBeneficiary(){
        return new ResponseEntity<>(beneficiaryService.getAllBeneficiaries(),HttpStatus.OK);
    }

    @GetMapping("/email")
    public ResponseEntity<GetBeneficiary> getBeneficiaryByEmail(@RequestParam(name = "email") String email) {
        return new ResponseEntity<>(beneficiaryService.getBeneficiariesByEmail(email), HttpStatus.OK);
    }
}