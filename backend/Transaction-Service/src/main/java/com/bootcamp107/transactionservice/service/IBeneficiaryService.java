package com.bootcamp107.transactionservice.service;
import com.bootcamp107.transactionservice.dto.CreateBeneficiary;
import com.bootcamp107.transactionservice.dto.GetBeneficiary;
import java.util.List;
import java.util.UUID;

public interface IBeneficiaryService {

    public List<GetBeneficiary> getAllBeneficiariesByUserId(UUID userId);

    public GetBeneficiary saveBeneficiary(CreateBeneficiary beneficiary);
}
