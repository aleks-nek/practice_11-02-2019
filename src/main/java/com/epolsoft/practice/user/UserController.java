package com.epolsoft.practice.user;


import com.epolsoft.practice.account.Account;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @RequestMapping("/current")
    public Account currentUser (){
        // TODO :(
        return null;
    }
}
