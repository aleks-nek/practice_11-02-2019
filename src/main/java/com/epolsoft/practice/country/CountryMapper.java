package com.epolsoft.practice.country;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Service;

import java.util.List;

@Mapper
@Service
public interface CountryMapper {
    @Select("select * from country where id=#{id}")
    Country findById(Long id);

    @Select("select * from country where name=#{name}")
    Country findByName(String name);

    @Select("select * from country")
    List<Country> selectAll();
}
