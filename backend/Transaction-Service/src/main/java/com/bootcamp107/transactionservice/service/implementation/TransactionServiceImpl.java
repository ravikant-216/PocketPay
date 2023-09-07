package com.bootcamp107.transactionservice.service.implementation;
import com.bootcamp107.transactionservice.dto.GetTransaction;
import com.bootcamp107.transactionservice.mapper.TransactionalMapper;
import com.bootcamp107.transactionservice.repository.TransactionRepository;
import com.bootcamp107.transactionservice.dto.CreateTransaction;
import com.bootcamp107.transactionservice.entity.Transaction;
import com.bootcamp107.transactionservice.service.ITransactionService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TransactionServiceImpl implements ITransactionService {

    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private TransactionalMapper transactionalMapper;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<GetTransaction> getAllTransactionsByUserId(UUID userId) {
        List<Transaction> transactionList = transactionRepository.findByUserId(userId);

        if (transactionList.isEmpty()) {
            throw new NoSuchElementException("Data not found with id: " + userId);
        }

        return transactionList.stream()
                .map(transaction -> transactionalMapper.convertToGetTransaction(transaction))
                .collect(Collectors.toList());
    }

    @Override
    public GetTransaction saveTransaction(CreateTransaction transaction) {
        Transaction newTransaction = transactionRepository.save(transactionalMapper.convertToEntity(transaction));
        return transactionalMapper.convertToGetTransaction(newTransaction);
    }

    @Override
    public List<GetTransaction> getAllTransactions() {
        return transactionRepository.findAll().stream()
                .map(transactionalMapper::convertToGetTransaction)
                .collect(Collectors.toList());
    }
}
