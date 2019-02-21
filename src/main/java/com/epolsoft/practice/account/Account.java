package com.epolsoft.practice.account;

import com.epolsoft.practice.profile.Profile;
import com.epolsoft.practice.role.Role;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Collection;

@Data
public class Account{
    private Long id;

    @NotBlank
    @Size(min = 5, max = 50)
    private String login;

    @NotBlank
    @Size(min = 6, max = 50)
    private String password;

    @NotNull
    private Profile profile;

    @NotNull
    private Role role;
}
