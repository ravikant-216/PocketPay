package com.bootcamp107.transactionservice.controller;
import com.bootcamp107.transactionservice.dto.CreateTransaction;
import com.bootcamp107.transactionservice.dto.GetTransaction;
import com.bootcamp107.transactionservice.service.ITransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/transactions/")
public class TransactionController {

    @Autowired
    private ITransactionService transactionService;

    @GetMapping
    public ResponseEntity<List<GetTransaction>> getAllTransactions(){
        return new ResponseEntity<>(transactionService.getAllTransactions(),HttpStatus.OK);
    }

    @GetMapping("{userId}")
    public ResponseEntity<List<GetTransaction>> getAllTransactionsByUserId(@PathVariable UUID userId) {
        return new ResponseEntity<>(transactionService.getAllTransactionsByUserId(userId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<GetTransaction> saveTransaction(@RequestBody CreateTransaction transaction) {
        return new ResponseEntity<>(transactionService.saveTransaction(transaction), HttpStatus.CREATED);
    }
}
