package com.epolsoft.practice.auth;

import com.epolsoft.practice.account.Account;
import com.epolsoft.practice.account.AccountMapper;
import com.epolsoft.practice.company.employee.Employee;
import com.epolsoft.practice.payload.ApiResponse;
import com.epolsoft.practice.payload.JwtAuthenticationResponse;
import com.epolsoft.practice.payload.LoginRequest;
import com.epolsoft.practice.profile.ProfileMapper;
import com.epolsoft.practice.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//@CrossOrigin(value = "http://127.0.0.1:3000")
@RestController
@RequestMapping("api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private AccountMapper accountMapper;

    @Autowired
    private ProfileMapper profileMapper;

    @PostMapping("/signin")
    public ResponseEntity<?> signIn (@RequestBody LoginRequest loginRequest){
        String jwt = authService.authenticate(
                loginRequest.getLogin(),
                loginRequest.getPassword());
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp (@RequestBody Account account){

        if(accountMapper.existsByLogin(account.getLogin())){
            return new ResponseEntity(new ApiResponse(false, "Login already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        if(profileMapper.existsByEmail(account.getProfile().getEmail())){
            return new ResponseEntity(new ApiResponse(false, "Email already in use"),
                    HttpStatus.BAD_REQUEST);
        }

        // пароль для последующей аутентификации,
        // т.к. после регистрации он будет зашифрован
        String password = account.getPassword();
        authService.register(account);

        String jwt = authService.authenticate(account.getLogin(), password);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }


}
