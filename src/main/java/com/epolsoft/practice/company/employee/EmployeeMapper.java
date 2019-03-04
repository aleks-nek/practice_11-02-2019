package com.epolsoft.practice.company.employee;

import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Service;

@Mapper
@Service
public interface EmployeeMapper {
    class Reference {
        static final String ACCOUNT = "com.epolsoft.practice.account.AccountMapper.findById";
        static final String COMPANY = "com.epolsoft.practice.company.CompanyMapper.findById";
        static final String ROLE = "com.epolsoft.practice.company.employeerole.EmployeeRoleMapper.findById";
    }

    @Insert("insert into employee (employee_role_id, account_id, company_id)" +
            "values (#{role.id}, #{account.id}, #{company.id})")
    @Options(keyProperty = "id", keyColumn = "id", useGeneratedKeys = true)
    void insert(Employee employee);

    @Select("select * from employee where id=#{id}")
    @Results(id = "employeeMapper", value = {
            @Result(property = "account", column = "account_id", one = @One(select = Reference.ACCOUNT)),
            @Result(property = "company", column = "company_id", one = @One(select = Reference.COMPANY)),
            @Result(property = "role", column = "employee_role_id", one = @One(select = Reference.ROLE))
    })
    Employee findById(Long id);
}
