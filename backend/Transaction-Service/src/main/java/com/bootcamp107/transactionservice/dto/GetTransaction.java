package com.bootcamp107.transactionservice.dto;
import com.bootcamp107.transactionservice.entity.Transaction;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;
import java.util.Date;
import java.util.UUID;

@Data
@Component
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetTransaction {

    private UUID id;
    private String referenceNumber;
    private Transaction.Status status;
    private Date time;
    private double sendingAmount;
    private double recievingAmount;
    private String sendingCurrencyCode;
    private String recievingCurrencyCode;
    private UUID beneficiaryId;
    private  UUID userId;
}