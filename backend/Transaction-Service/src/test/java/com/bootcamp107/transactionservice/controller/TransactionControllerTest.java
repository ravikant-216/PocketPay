package com.bootcamp107.transactionservice.controller;
import com.bootcamp107.transactionservice.dto.CreateTransaction;
import com.bootcamp107.transactionservice.dto.GetTransaction;
import com.bootcamp107.transactionservice.entity.Transaction;
import com.bootcamp107.transactionservice.service.ITransactionService;
import com.bootcamp107.transactionservice.util.MockObject;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TransactionControllerTest {

    @Mock
    private ITransactionService transactionService;

    @InjectMocks
    private TransactionController transactionController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllTransactionsByUserId() {
        UUID userId = UUID.randomUUID();

        GetTransaction getTransaction1 = MockObject.createGetTransaction("ABC123", Transaction.Status.PENDING,  100.0, 200.0, "USD", "INR");
        GetTransaction getTransaction2 = MockObject.createGetTransaction("DEF456", Transaction.Status.CANCELLED, 300.0, 600.0, "EUR", "INR" );
        GetTransaction getTransaction3 = MockObject.createGetTransaction("GHI789", Transaction.Status.CANCELLED, 500.0, 1000.0, "GBP", "INR");
        List<GetTransaction> transactions = Arrays.asList(getTransaction1,getTransaction2,getTransaction3);
        when(transactionService.getAllTransactionsByUserId(userId)).thenReturn(transactions);
        ResponseEntity<List<GetTransaction>> response = transactionController.getAllTransactionsByUserId(userId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertThat(response.getBody())
                .hasSize(3)
                .containsExactlyInAnyOrder(getTransaction1, getTransaction2,getTransaction3);
        assertEquals(3, response.getBody().size());
        assertEquals("ABC123", response.getBody().get(0).getReferenceNumber());
        assertEquals(200.0, response.getBody().get(0).getRecievingAmount());
        assertEquals(100.0, response.getBody().get(0).getSendingAmount());
        assertEquals("USD", response.getBody().get(0).getSendingCurrencyCode());
        assertEquals("INR", response.getBody().get(0).getRecievingCurrencyCode());
        assertEquals(Transaction.Status.PENDING, response.getBody().get(0).getStatus());
        verify(transactionService).getAllTransactionsByUserId(userId);
    }

    @Test
    void saveTransaction() {

        CreateTransaction createTransaction = MockObject.createCreateTransaction("ABC123", Transaction.Status.PENDING,  100.0, 200.0, "USD", "INR");
        GetTransaction getTransaction = MockObject.createGetTransaction("ABC123", Transaction.Status.PENDING, 100.0, 200.0, "USD", "INR");
        when(transactionService.saveTransaction(createTransaction)).thenReturn(getTransaction);
        ResponseEntity<GetTransaction> response = transactionController.saveTransaction(createTransaction);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("ABC123", response.getBody().getReferenceNumber());
        assertEquals(200.0, response.getBody().getRecievingAmount());
        assertEquals(100.0, response.getBody().getSendingAmount());
        assertEquals("USD", response.getBody().getSendingCurrencyCode());
        assertEquals("INR", response.getBody().getRecievingCurrencyCode());
        assertEquals(Transaction.Status.PENDING, response.getBody().getStatus());
        verify(transactionService).saveTransaction(createTransaction);
    }

    @Test
    void testGetAllTransactions() {
        GetTransaction getTransaction1 = MockObject.createGetTransaction("ABC123", Transaction.Status.PENDING, 100.0, 200.0, "USD", "INR");
        GetTransaction getTransaction2 = MockObject.createGetTransaction("DEF456", Transaction.Status.CANCELLED, 300.0, 600.0, "EUR", "INR");
        GetTransaction getTransaction3 = MockObject.createGetTransaction("GHI789", Transaction.Status.CANCELLED, 500.0, 1000.0, "GBP", "INR");
        List<GetTransaction> transactions = Arrays.asList(getTransaction1, getTransaction2, getTransaction3);
        when(transactionService.getAllTransactions()).thenReturn(transactions);

        ResponseEntity<List<GetTransaction>> response = transactionController.getAllTransactions();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertThat(response.getBody())
                .hasSize(3)
                .containsExactlyInAnyOrder(getTransaction1, getTransaction2, getTransaction3);

        verify(transactionService).getAllTransactions();
    }
}
