package com.epolsoft.practice.company;

import com.epolsoft.practice.country.Country;
import lombok.Data;

@Data
public class Company {
    private Long id;
    private String name;
    private Country country;
    private String city;
}
