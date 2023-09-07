package com.bootcamp107.transactionservice.util;
import com.bootcamp107.transactionservice.dto.CreateBeneficiary;
import com.bootcamp107.transactionservice.dto.CreateTransaction;
import com.bootcamp107.transactionservice.dto.GetBeneficiary;
import com.bootcamp107.transactionservice.dto.GetTransaction;
import com.bootcamp107.transactionservice.entity.Beneficiary;
import com.bootcamp107.transactionservice.entity.Transaction;
import java.util.Date;
import java.util.UUID;

public class MockObject {

    private MockObject() {}

    public static GetBeneficiary createGetBeneficiary(UUID id, String firstName, String lastName, String email, String accountNumber, String ifsc, UUID userId) {

        return GetBeneficiary.builder()
                .id(id)
                .firstName(firstName)
                .lastName(lastName)
                .email(email)
                .accountNumber(accountNumber)
                .ifsc(ifsc)
                .userId(userId)
                .build();
    }


    public static CreateBeneficiary createCreateBeneficiary(String firstName, String lastName, String email, String accountNumber, String ifsc, UUID userId) {

        return CreateBeneficiary.builder()
                .firstName(firstName)
                .lastName(lastName)
                .email(email)
                .accountNumber(accountNumber)
                .ifsc(ifsc)
                .userId(userId)
                .build();
    }
    public static Beneficiary createBeneficiary(String firstName, String lastName, String email, String accountNumber, String ifsc, UUID userId) {

        return Beneficiary.builder()
                .id(UUID.randomUUID())
                .firstName(firstName)
                .lastName(lastName)
                .email(email)
                .accountNumber(accountNumber)
                .ifsc(ifsc)
                .userId(userId)
                .build();
    }

    public static GetTransaction createGetTransaction( String referenceNumber, Transaction.Status status, double sendingAmount, double recievingAmount, String sendingCurrencyCode, String recievingCurrencyCode) {

        return GetTransaction.builder()
                .id(UUID.randomUUID())
                .referenceNumber(referenceNumber)
                .status(status)
                .time(new Date())
                .sendingAmount(sendingAmount)
                .recievingAmount(recievingAmount)
                .sendingCurrencyCode(sendingCurrencyCode)
                .recievingCurrencyCode(recievingCurrencyCode)
                .beneficiaryId(UUID.randomUUID())
                .userId(UUID.randomUUID())
                .build();
    }

    public static CreateTransaction createCreateTransaction(String referenceNumber, Transaction.Status status, double sendingAmount, double recievingAmount, String sendingCurrencyCode, String recievingCurrencyCode) {

        return CreateTransaction.builder()
                .referenceNumber(referenceNumber)
                .status(status)
                .time(new Date())
                .sendingAmount(sendingAmount)
                .recievingAmount(recievingAmount)
                .sendingCurrencyCode(sendingCurrencyCode)
                .recievingCurrencyCode(recievingCurrencyCode)
                .beneficiaryId(UUID.randomUUID())
                .userId(UUID.randomUUID())
                .build();
    }
    public static Transaction createTransaction(Beneficiary beneficiary,String referenceNumber, Transaction.Status status, double sendingAmount, double recievingAmount, String sendingCurrencyCode, String recievingCurrencyCode) {

        return Transaction.builder()
                .referenceNumber(referenceNumber)
                .status(status)
                .time(new Date())
                .sendingAmount(sendingAmount)
                .recievingAmount(recievingAmount)
                .sendingCurrencyCode(sendingCurrencyCode)
                .recievingCurrencyCode(recievingCurrencyCode)
                .beneficiary(beneficiary)
                .userId(UUID.randomUUID())
                .build();
    }
}
