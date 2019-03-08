package com.epolsoft.practice.company.employee;

import com.epolsoft.practice.account.Account;
import com.epolsoft.practice.company.Company;
import com.epolsoft.practice.company.employeerole.EmployeeRole;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class Employee {
    private Long id;

    @NotNull
    private Company company;

    @NotNull
    private EmployeeRole role;
}
