package com.epolsoft.practice.profile;


import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Mapper
@Component
public interface ProfileMapper {

    @Select("select * from profile where id=#{id}")
    @Results(id = "profileMapper", value = {
        @Result(property = "id", column = "id"),
        @Result(property = "firstName", column = "first_name"),
        @Result(property = "lastName", column = "last_name"),
    })
    Profile findById(Long id);

    @Insert("insert into profile (email, first_name, last_name) values (#{email}, #{firstName}, #{lastName})")
    @Options(keyProperty = "id", keyColumn = "id", useGeneratedKeys = true)
    void insert(Profile profile);

    @Select("select exists(select 1 from profile WHERE email=#{email})")
    Boolean existsByEmail(String email);
}
