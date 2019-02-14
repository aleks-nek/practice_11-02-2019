package com.epolsoft.practice.account;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.SelectKey;
import org.springframework.stereotype.Service;

@Mapper
@Service
interface AccountMapper {
    @Insert("insert into account (login, password) values(#{login}, #{password})")
    @Options(keyProperty = "id", keyColumn = "id", useGeneratedKeys = true)
    void insert(Account account);
}
