package com.epolsoft.practice.role;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Service;

@Mapper
@Service
public interface RoleMapper {

    @Select("select * from role_dictionary where id=#{id}")
    Role findById(Long id);

    @Select("select * from role_dictionary where name=#{name}")
    Role findByName(String name);
}
