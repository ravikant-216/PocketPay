package com.bootcamp107.business.service.repository;

import com.bootcamp107.business.service.entity.BusinessCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusinessCategoryRepository extends JpaRepository<BusinessCategory ,Integer> {
}