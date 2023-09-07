package com.bootcamp107.transactionservice.service;
import com.bootcamp107.transactionservice.dto.CreateTransaction;
import com.bootcamp107.transactionservice.dto.GetTransaction;
import java.util.List;
import java.util.UUID;

public interface ITransactionService {

    public List<GetTransaction> getAllTransactionsByUserId(UUID id);

    public GetTransaction saveTransaction(CreateTransaction transaction);
    public List<GetTransaction> getAllTransactions();
}
