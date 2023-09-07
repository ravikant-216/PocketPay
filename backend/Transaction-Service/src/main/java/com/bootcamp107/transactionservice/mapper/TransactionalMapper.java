package com.bootcamp107.transactionservice.mapper;
import com.bootcamp107.transactionservice.dto.CreateTransaction;
import com.bootcamp107.transactionservice.dto.GetTransaction;
import com.bootcamp107.transactionservice.entity.Beneficiary;
import com.bootcamp107.transactionservice.entity.Transaction;
import com.bootcamp107.transactionservice.repository.BeneficiaryRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.NoSuchElementException;

@Component
public class TransactionalMapper {

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private BeneficiaryRepository beneficiaryRepository;

    public Transaction convertToEntity(CreateTransaction object) {

        Beneficiary beneficiary = beneficiaryRepository.findById(object.getBeneficiaryId()).orElseThrow(() -> {
            return new NoSuchElementException("No Data Found for beneficiary id : " + object.getBeneficiaryId());
        });
        Transaction transaction = modelMapper.map(object, Transaction.class);
        transaction.setBeneficiary(beneficiary);
        return transaction;
    }

    public GetTransaction convertToGetTransaction(Transaction transaction) {

        GetTransaction getTransaction = modelMapper.map(transaction, GetTransaction.class);
        getTransaction.setBeneficiaryId(transaction.getBeneficiary().getId());
        return getTransaction;
    }
}
