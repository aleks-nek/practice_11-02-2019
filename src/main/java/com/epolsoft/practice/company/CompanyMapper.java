package com.epolsoft.practice.company;

import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Service;

@Mapper
@Service
public interface CompanyMapper {
    class Reference {
        static final String COUNTRY = "com.epolsoft.practice.country.CountryMapper.findById";
    }

    @Insert("insert into company (name, country_id, city) " +
            "values(#{name}, #{country.id}, #{city})")
    @Options(keyProperty = "id", keyColumn = "id", useGeneratedKeys = true)
    void insert(Company company);

    @Select("select * from company where id=#{id}")
    @Results(id="companyMapper", value = {
        @Result(property = "country", column = "country_id", one = @One(select = Reference.COUNTRY)),
    })
    Company findById(Long id);
}
