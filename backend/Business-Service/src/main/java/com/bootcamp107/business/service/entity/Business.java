package com.bootcamp107.business.service.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "business")
public class Business {

    @Id
    @GeneratedValue(generator = "uuid-hibernate-generator")
    @GenericGenerator(name = "uuid-hibernate-generator", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID  id;

    @Column(name = "registration_number")
    private String registrationNumber;

    @Column(name = "registration_address")
    private String registrationAddress;

    private String name;

    @Column(name = "trading_address")
    private String tradingAddress;

    @Column(name = "business_category_id")
    private int businessCategoryId;

    @Column(name = "countryId")
    private  int countryId;

    @GeneratedValue(generator = "uuid-hibernate-generator")
    @GenericGenerator(name = "uuid-hibernate-generator", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name ="owner_id")
    private UUID ownerId;

}
