package com.bootcamp107.transactionservice.mapper;
import com.bootcamp107.transactionservice.dto.CreateBeneficiary;
import com.bootcamp107.transactionservice.dto.GetBeneficiary;
import com.bootcamp107.transactionservice.entity.Beneficiary;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BeneficiaryMapper {

    @Autowired
    private ModelMapper modelMapper;

    public GetBeneficiary convertToGetBeneficiary(Beneficiary beneficiary){
        return modelMapper.map(beneficiary, GetBeneficiary.class);
    }

    public Beneficiary convertToEntity(CreateBeneficiary beneficiary){
        return modelMapper.map(beneficiary, Beneficiary.class);
    }
}
