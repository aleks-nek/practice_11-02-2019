package com.epolsoft.practice.company.employeerole;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Service;

@Mapper
@Service
public interface EmployeeRoleMapper {
    @Select("select * from employee_role where id=#{id}")
    EmployeeRole findById(Long id);

    @Select("select * from employee_role where name=#{name}")
    EmployeeRole findByName(String name);
}