package com.bootcamp107.transactionservice.service.implementation;
import com.bootcamp107.transactionservice.dto.GetBeneficiary;
import com.bootcamp107.transactionservice.mapper.BeneficiaryMapper;
import com.bootcamp107.transactionservice.repository.BeneficiaryRepository;
import com.bootcamp107.transactionservice.dto.CreateBeneficiary;
import com.bootcamp107.transactionservice.entity.Beneficiary;
import com.bootcamp107.transactionservice.service.IBeneficiaryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BeneficiaryServiceImpl implements IBeneficiaryService {

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private BeneficiaryMapper beneficiaryMapper;
    @Autowired
    private BeneficiaryRepository beneficiaryRepository;

    @Override
    public List<GetBeneficiary> getAllBeneficiariesByUserId(UUID userId) {
        List<Beneficiary> beneficiaryList = beneficiaryRepository.findByUserId(userId);

        if (beneficiaryList.isEmpty()) {
            throw new NoSuchElementException("Data not found with id: " + userId);
        }

        return beneficiaryList.stream()
                .map(beneficiary -> beneficiaryMapper.convertToGetBeneficiary(beneficiary))
                .collect(Collectors.toList());
    }

    @Override
    public GetBeneficiary saveBeneficiary(CreateBeneficiary beneficiary) {
        Beneficiary newBeneficiary = beneficiaryRepository.save(beneficiaryMapper.convertToEntity(beneficiary));
        return beneficiaryMapper.convertToGetBeneficiary(newBeneficiary);
    }

    @Override
    public List<GetBeneficiary> getAllBeneficiaries() {
        return beneficiaryRepository.findAll().stream()
                .map(beneficiaryMapper::convertToGetBeneficiary)
                .collect(Collectors.toList());
    }

    @Override
    public GetBeneficiary getBeneficiariesByEmail(String email) {
       Optional<Beneficiary> beneficiary = beneficiaryRepository.findByEmail(email);
       if(beneficiary.isPresent())
        return  beneficiaryMapper.convertToGetBeneficiary(beneficiary.get());
       else
           throw new NoSuchElementException("No Data Found for email : "+email);
    }
}
