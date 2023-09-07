package com.bootcamp107.transactionservice.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;
import java.util.UUID;

@Data
@Component
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetBeneficiary {

    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private String accountNumber;
    private String ifsc;
    private UUID userId;
}
