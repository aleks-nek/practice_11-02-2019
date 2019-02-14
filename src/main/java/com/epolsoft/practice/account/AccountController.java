package com.epolsoft.practice.account;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountController {
    @Autowired
    private AccountMapper accountMapper;

    @PostMapping("/user")
    public void adduser(@RequestBody Account account){
        accountMapper.insert(account);
        System.out.println("");
    }
}
