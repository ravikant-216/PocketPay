package com.bootcamp107.business.service.repository;

import com.bootcamp107.business.service.entity.Business;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BusinessRepository  extends JpaRepository<Business , UUID> {
}
