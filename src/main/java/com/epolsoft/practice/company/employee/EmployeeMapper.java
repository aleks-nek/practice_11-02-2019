package com.epolsoft.practice.company.employee;

import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Mapper
@Service
public interface EmployeeMapper {
    class Reference {
        static final String COMPANY = "com.epolsoft.practice.company.CompanyMapper.findById";
        static final String EMPLOYEE_ROLE = "com.epolsoft.practice.company.employeerole.EmployeeRoleMapper.findById";
    }

    @Insert("insert into employee (employee_role_id, company_id)" +
            "values (#{role.id}, #{company.id})")
    @Options(keyProperty = "id", keyColumn = "id", useGeneratedKeys = true)
    void insert(Employee employee);

    @Select("select * from employee where id=#{id}")
    @Results(id = "employeeMapper", value = {
            @Result(property = "company", column = "company_id", one = @One(select = Reference.COMPANY)),
            @Result(property = "role", column = "employee_role_id", one = @One(select = Reference.EMPLOYEE_ROLE))
    })
    Employee findById(Long id);

    @Select("select * from employee where company_id=#{id}")
    @ResultMap(value = "employeeMapper")
    List<Employee> findAllWithCompanyId(Long id);
}
