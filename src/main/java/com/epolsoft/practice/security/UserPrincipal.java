package com.epolsoft.practice.security;

import com.epolsoft.practice.account.Account;
import com.epolsoft.practice.company.employee.Employee;
import com.epolsoft.practice.company.employee.EmployeeMapper;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class UserPrincipal implements UserDetails {
    private Long id; // для метода equals и JwtTokenProvider
    private Account account;

    private Collection<? extends GrantedAuthority> authorities;

    public UserPrincipal(Account account, Collection<? extends GrantedAuthority> authorities) {
        this.account = account;
        this.id = account.getId();
        this.authorities = authorities;
    }

//    public UserPrincipal(Long id, String username, String password, String firstName, String lastName, String email, Collection<? extends GrantedAuthority> authorities) {
//        this.id = id;
//        this.login = username;
//        this.password = password;
//        this.firstName = firstName;
//        this.lastName = lastName;
//        this.email = email;
//        this.authorities = authorities;
//    }
//
//    public UserPrincipal(Employee employee, Long id, String username, String password, String firstName, String lastName, String email, Collection<? extends GrantedAuthority> authorities) {
//        this.employee = employee;
//
//        this.id = id;
//        this.login = username;
//        this.password = password;
//        this.firstName = firstName;
//        this.lastName = lastName;
//        this.email = email;
//        this.authorities = authorities;
//    }

    public static UserPrincipal create(Account account) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(account.getRole().getName()));

        return new UserPrincipal(
//                account.getEmployee(),
//                account.getId(),
//                account.getLogin(),
//                account.getPassword(),
//                account.getProfile().getFirstName(),
//                account.getProfile().getLastName(),
//                account.getProfile().getEmail(),
                account,
                authorities
        );
    }

    public Account getAccount() {
        return account;
    }

    public Long getId() {
        return account.getId();
    }

    @Override
    public String getUsername() {
        return account.getLogin();
    }

    @Override
    public String getPassword() {
        return account.getPassword();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserPrincipal that = (UserPrincipal) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id);
    }
}
