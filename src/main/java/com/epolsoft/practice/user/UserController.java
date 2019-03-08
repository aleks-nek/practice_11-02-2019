package com.epolsoft.practice.user;


import com.epolsoft.practice.payload.UserSummary;
import com.epolsoft.practice.security.CurrentUser;
import com.epolsoft.practice.security.UserPrincipal;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/me")
//    @PreAuthorize("hasRole('ROLE_USER')")
    public UserSummary getCurrentUser (@CurrentUser UserPrincipal currentUser){
        return new UserSummary(
                currentUser.getAccount()
        );
    }
}
