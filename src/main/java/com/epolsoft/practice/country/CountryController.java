package com.epolsoft.practice.country;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CountryController {
    @Autowired
    private CountryMapper countryMapper;

    @GetMapping("/country")
    public List<Country> get(){
        return countryMapper.selectAllCountries();
    }
}