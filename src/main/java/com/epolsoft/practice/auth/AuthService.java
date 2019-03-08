package com.epolsoft.practice.auth;

import com.epolsoft.practice.account.Account;
import com.epolsoft.practice.account.AccountMapper;
import com.epolsoft.practice.company.CompanyMapper;
import com.epolsoft.practice.company.employee.Employee;
import com.epolsoft.practice.company.employee.EmployeeMapper;
import com.epolsoft.practice.company.employeerole.EmployeeRole;
import com.epolsoft.practice.company.employeerole.EmployeeRoleMapper;
import com.epolsoft.practice.country.Country;
import com.epolsoft.practice.country.CountryMapper;
import com.epolsoft.practice.profile.ProfileMapper;
import com.epolsoft.practice.role.Role;
import com.epolsoft.practice.role.RoleMapper;
import com.epolsoft.practice.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = Exception.class)
public class AuthService {

    private final String ROLE_USER = "ROLE_USER";
    private final String ROLE_OWNER = "ROLE_OWNER";

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AccountMapper accountMapper;

    @Autowired
    private ProfileMapper profileMapper;

    @Autowired
    private RoleMapper roleMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    EmployeeRoleMapper employeeRoleMapper;

    @Autowired
    CountryMapper countryMapper;

    @Autowired
    CompanyMapper companyMapper;

    @Autowired
    private EmployeeMapper employeeMapper;

    public Account register(Account account){
        Role role = roleMapper.findByName(ROLE_USER); // TODO Раскидать по сервисам
        account.setRole(role);

        profileMapper.insert(account.getProfile());


        // установка сотруднику роли ROLE_OWNER
        EmployeeRole employeeRole = employeeRoleMapper.findByName(ROLE_OWNER);
        account.getEmployee().setRole(employeeRole);

        Country country = countryMapper.findByName(account.getEmployee().getCompany().getCountry().getName());
        account.getEmployee().getCompany().setCountry(country);

        companyMapper.insert(account.getEmployee().getCompany());

        employeeMapper.insert(account.getEmployee());


        account.setPassword(passwordEncoder.encode(account.getPassword()));
        accountMapper.insert(account);

        return account;
    }

    public String authenticate(String login, String password){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        login,
                        password
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        return jwtTokenProvider.generateToken(authentication);
    }
}
