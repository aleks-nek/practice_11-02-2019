package com.epolsoft.practice.auth;

import com.epolsoft.practice.account.Account;
import com.epolsoft.practice.account.AccountMapper;
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

@Service
public class AuthService {

    private final String ROLE_USER = "ROLE_USER";

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



    public Account register(Account account){
        Role role = roleMapper.findByName(ROLE_USER);
        account.setRole(role);

        profileMapper.insert(account.getProfile());

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
