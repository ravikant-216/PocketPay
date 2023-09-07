package com.bootcamp107.business.service;


import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.aspectj.bridge.MessageUtil.fail;


@SpringBootTest
class BusinessServiceApplicationTests {

    @Test
    void contextLoads() {
        try {
            BusinessServiceApplication.main(new String[]{});
        } catch (Exception e) {
            fail("Exception occurred: " + e.getMessage());
        }
    }
}