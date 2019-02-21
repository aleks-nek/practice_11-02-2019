package com.epolsoft.practice.security;

import com.epolsoft.practice.account.Account;
import com.epolsoft.practice.account.AccountMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    AccountMapper accountMapper;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String login)
            throws UsernameNotFoundException {

        Account user = accountMapper.findByLogin((login));

        if(user == null){
            throw new UsernameNotFoundException("User not found with login : " + login);
        }

        return UserPrincipal.create(user);
    }

    @Transactional
    public UserDetails loadUserById(Long id) {
        Account user = accountMapper.findById(id);

        if(user == null){
            throw new UsernameNotFoundException("User not found with id : " + id);
        }

        return UserPrincipal.create(user);
    }
}
