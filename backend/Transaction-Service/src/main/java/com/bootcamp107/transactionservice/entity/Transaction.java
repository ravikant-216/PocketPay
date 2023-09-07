package com.bootcamp107.transactionservice.entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "transaction")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(generator = "uuid-hibernate-generator")
    @GenericGenerator(name = "uuid-hibernate-generator", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    @Column(unique = true, nullable = false)
    private String referenceNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Column(nullable = false)
    private Date time;

    @Column(nullable = false)
    private double sendingAmount;

    @Column(nullable = false)
    private double recievingAmount;

    @Column(nullable = false)
    private String sendingCurrencyCode;

    @Column(nullable = false)
    private String recievingCurrencyCode;

    @Column( nullable = false)
    private UUID userId;

    @ManyToOne(fetch = FetchType.LAZY ,cascade = {CascadeType.MERGE})
    @JoinColumn(name = "beneficiary_id")
    private Beneficiary beneficiary;

    public enum Status {
        PENDING, CANCELLED
    }
}