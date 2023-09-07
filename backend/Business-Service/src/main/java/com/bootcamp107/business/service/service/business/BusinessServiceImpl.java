package com.bootcamp107.business.service.service.business;

import com.bootcamp107.business.service.dto.GetBusiness;
import com.bootcamp107.business.service.dto.PostBusiness;
import com.bootcamp107.business.service.entity.Business;
import com.bootcamp107.business.service.mapper.BusinessMapper;
import com.bootcamp107.business.service.repository.BusinessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BusinessServiceImpl implements IBusinessService {
    @Autowired
    private BusinessRepository businessRepository;

    @Autowired
    private BusinessMapper businessMapper;
    @Override
    public GetBusiness addBusiness(PostBusiness businessDto) {
        Business newBusiness = businessMapper.convertDtoToEntity(businessDto);
        businessRepository.save(newBusiness);
        return businessMapper.convertEntityToDto(newBusiness);
    }
}
