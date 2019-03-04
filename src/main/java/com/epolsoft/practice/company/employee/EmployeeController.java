package com.epolsoft.practice.company.employee;


import com.epolsoft.practice.auth.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class EmployeeController {
    @Autowired
    private AuthService authService;

    @PostMapping("/employee")
    public void add(@RequestBody Employee employee){
        authService.register(employee);
    }
}
