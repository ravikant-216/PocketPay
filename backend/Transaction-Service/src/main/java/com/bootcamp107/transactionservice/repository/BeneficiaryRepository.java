package com.bootcamp107.transactionservice.repository;
import com.bootcamp107.transactionservice.entity.Beneficiary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BeneficiaryRepository extends JpaRepository<Beneficiary, UUID> {

    List<Beneficiary> findByUserId(UUID userId);
    Optional<Beneficiary> findByEmail(String email);
}
