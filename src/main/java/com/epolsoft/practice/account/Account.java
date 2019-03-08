package com.epolsoft.practice.account;

import com.epolsoft.practice.company.employee.Employee;
import com.epolsoft.practice.profile.Profile;
import com.epolsoft.practice.role.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class Account{
    private Long id;

    @NotBlank
    @Size(min = 5, max = 50)
    private String login;

    @NotBlank
    @JsonIgnore
    @Size(min = 6, max = 50)
    private String password;

    @NotNull
    private Profile profile;

    @NotNull
    private Employee employee;

    @NotNull
    private Role role;
}
