package com.bootcamp107.transactionservice.service.implementation;
import com.bootcamp107.transactionservice.dto.CreateTransaction;
import com.bootcamp107.transactionservice.dto.GetTransaction;
import com.bootcamp107.transactionservice.entity.Beneficiary;
import com.bootcamp107.transactionservice.entity.Transaction;
import com.bootcamp107.transactionservice.mapper.TransactionalMapper;
import com.bootcamp107.transactionservice.repository.TransactionRepository;
import com.bootcamp107.transactionservice.util.MockObject;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.*;

import static org.mockito.Mockito.*;

class TransactionServiceImplTest {

    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private TransactionalMapper transactionalMapper;

    @InjectMocks
    private TransactionServiceImpl transactionService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllTransactionsByUserId() {
        UUID userId = UUID.randomUUID();
        GetTransaction getTransaction1 = MockObject.createGetTransaction("ABC123", Transaction.Status.PENDING, 100.0, 200.0, "USD", "INR");
        GetTransaction getTransaction2 = MockObject.createGetTransaction("DEF456", Transaction.Status.CANCELLED, 300.0, 600.0, "EUR", "INR");
        GetTransaction getTransaction3 = MockObject.createGetTransaction("GHI789", Transaction.Status.CANCELLED, 500.0, 1000.0, "GBP", "INR");
        Beneficiary beneficiary = MockObject.createBeneficiary("Ravi", "Kumar", "ravi.kumar@gmail.com", "98765432101", "ZYXWVU09876", UUID.randomUUID());
        Transaction transaction1 = MockObject.createTransaction(beneficiary,"ABC123", Transaction.Status.PENDING, 100.0, 200.0, "USD", "INR");
        Transaction transaction2 = MockObject.createTransaction(beneficiary,"DEF456", Transaction.Status.CANCELLED, 300.0, 600.0, "EUR", "INR");
        Transaction transaction3 = MockObject.createTransaction(beneficiary,"GHI789", Transaction.Status.CANCELLED, 500.0, 1000.0, "GBP", "INR");
        List<Transaction> transactions = Arrays.asList(transaction1,transaction2,transaction3);
        when(transactionRepository.findByUserId(userId)).thenReturn(transactions);
        when(transactionalMapper.convertToGetTransaction(transaction1)).thenReturn(getTransaction1);
        when(transactionalMapper.convertToGetTransaction(transaction2)).thenReturn(getTransaction2);
        when(transactionalMapper.convertToGetTransaction(transaction3)).thenReturn(getTransaction3);

        List<GetTransaction> result = transactionService.getAllTransactionsByUserId(userId);

        Assertions.assertThat(result)
                .hasSize(3)
                .containsExactlyInAnyOrder(getTransaction1, getTransaction2,getTransaction3);
        assertEquals(3, result.size());
        assertEquals("ABC123", result.get(0).getReferenceNumber());
        assertEquals(200.0, result.get(0).getRecievingAmount());
        assertEquals(100.0, result.get(0).getSendingAmount());
        assertEquals("USD", result.get(0).getSendingCurrencyCode());
        assertEquals("INR", result.get(0).getRecievingCurrencyCode());
        assertEquals(Transaction.Status.PENDING, result.get(0).getStatus());

        verify(transactionRepository).findByUserId(userId);
        verify(transactionalMapper,times(3)).convertToGetTransaction(any(Transaction.class));
    }

    @Test
    void getAllTransactionsByUserId_emptyList() {
        UUID userId = UUID.randomUUID();
        when(transactionRepository.findByUserId(userId)).thenReturn(new ArrayList<>());

        assertThrows(NoSuchElementException.class, () -> transactionService.getAllTransactionsByUserId(userId));

        verify(transactionRepository).findByUserId(userId);
    }

    @Test
    void saveTransaction() {

        CreateTransaction createTransaction = MockObject.createCreateTransaction("ABC123", Transaction.Status.PENDING,  100.0, 200.0, "USD", "INR");
        Beneficiary beneficiary = MockObject.createBeneficiary("Ravi", "Kumar", "ravi.kumar@gmail.com", "98765432101", "ZYXWVU09876", UUID.randomUUID());
        Transaction transaction = MockObject.createTransaction(beneficiary,"ABC123", Transaction.Status.PENDING,  100.0, 200.0, "USD", "INR");
        when(transactionalMapper.convertToEntity(createTransaction)).thenReturn(transaction);
        when(transactionRepository.save(transaction)).thenReturn(transaction);
        GetTransaction getTransaction = MockObject.createGetTransaction("ABC123", Transaction.Status.PENDING, 100.0, 200.0, "USD", "INR");
        when(transactionalMapper.convertToGetTransaction(transaction)).thenReturn(getTransaction);

        GetTransaction result = transactionService.saveTransaction(createTransaction);
        assertNotNull(result);
        assertEquals("ABC123", result.getReferenceNumber());
        assertEquals(200.0, result.getRecievingAmount());
        assertEquals(100.0, result.getSendingAmount());
        assertEquals("USD", result.getSendingCurrencyCode());
        assertEquals("INR", result.getRecievingCurrencyCode());
        assertEquals(Transaction.Status.PENDING, result.getStatus());

        verify(transactionalMapper).convertToEntity(createTransaction);
        verify(transactionRepository).save(transaction);
        verify(transactionalMapper).convertToGetTransaction(transaction);
    }
}
