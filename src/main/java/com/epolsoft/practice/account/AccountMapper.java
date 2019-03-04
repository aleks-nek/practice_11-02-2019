package com.epolsoft.practice.account;

import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Service;

@Mapper
@Service
public interface AccountMapper {

    class Reference {
        static final String ROLE = "com.epolsoft.practice.role.RoleMapper.findById";
        static final String PROFILE = "com.epolsoft.practice.profile.ProfileMapper.findById";
    }

    @Insert("insert into account (login, password, profile_id, role_id) " +
            "values(#{login}, #{password}, #{profile.id}, #{role.id})")
    @Options(keyProperty = "id", keyColumn = "id", useGeneratedKeys = true)
    void insert(Account account);



    @Select("select * from account where id=#{id}")
    @Results(id="accountMapper", value = {
            @Result(property = "role", column = "role_id", one = @One(select = Reference.ROLE)),
            @Result(property = "profile", column = "profile_id", one = @One(select = Reference.PROFILE)),
    })
    Account findById(Long id);

    @Select("select * from account where login=#{login}")
    @ResultMap(value = "accountMapper")
    Account findByLogin(String login);

    @Select("select exists(select 1 from account WHERE login=#{login})")
    Boolean existsByLogin(String login);

    @Select("select exists(select 1 from account WHERE login=#{email})")
    Boolean existsByEmail(String email);
}
