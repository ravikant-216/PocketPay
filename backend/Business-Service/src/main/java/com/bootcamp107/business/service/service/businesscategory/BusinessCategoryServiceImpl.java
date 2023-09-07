package com.bootcamp107.business.service.service.businesscategory;

import com.bootcamp107.business.service.mapper.BusinessCategoryMapper;
import com.bootcamp107.business.service.repository.BusinessCategoryRepository;
import com.bootcamp107.business.service.dto.GetBusinessCategory;
import com.bootcamp107.business.service.entity.BusinessCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BusinessCategoryServiceImpl implements IBusinessCategoryService {

    @Autowired
    private BusinessCategoryRepository businessCategoryRepository;

    @Autowired
    private BusinessCategoryMapper businessCategoryMapper;

    @Override
    public List<GetBusinessCategory> getAll() {
        List<BusinessCategory> list = businessCategoryRepository.findAll();
        return list.stream().map(category-> businessCategoryMapper.convertEntityToDto(category)).collect(Collectors.toList());
    }
}
