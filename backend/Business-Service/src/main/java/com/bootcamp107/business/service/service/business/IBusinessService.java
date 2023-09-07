package com.bootcamp107.business.service.service.business;

import com.bootcamp107.business.service.dto.GetBusiness;
import com.bootcamp107.business.service.dto.PostBusiness;

public interface IBusinessService {

    GetBusiness addBusiness(PostBusiness businessDto);
}
