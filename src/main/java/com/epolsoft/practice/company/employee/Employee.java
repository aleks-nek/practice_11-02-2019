package com.epolsoft.practice.company.employee;

import com.epolsoft.practice.account.Account;
import com.epolsoft.practice.company.Company;
import com.epolsoft.practice.company.employeerole.EmployeeRole;
import lombok.Data;

@Data
public class Employee {
    private Long id;
    private Account account;
    private Company company;
    private EmployeeRole role;
}
