package com.epolsoft.practice.account;

import com.epolsoft.practice.profile.ProfileMapper;
import com.epolsoft.practice.role.Role;
import com.epolsoft.practice.role.RoleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
public class AccountController {
    private final String ROLE_USER = "ROLE_USER";

    @Autowired
    private AccountMapper accountMapper;

    @Autowired
    private ProfileMapper profileMapper;

    @Autowired
    private RoleMapper roleMapper;

    @PostMapping("/account")
    public void add(@RequestBody Account account){
        // TODO вынести логику в service
        profileMapper.insert(account.getProfile());

        Role role = roleMapper.findByName(ROLE_USER);
        account.setRole(role);

        accountMapper.insert(account);
    }

    @GetMapping("/account/{id}")
    public Account get(@PathVariable Long id){
        return accountMapper.findById(id);
    }

//    @GetMapping("/account-login/{login}")
//    public Account getByLogin(@PathVariable String login){
//        return accountMapper.findByLogin(new Criteria(login));
//    }
}