package com.epolsoft.practice.company.client;

import com.epolsoft.practice.company.Company;
import com.epolsoft.practice.company.CompanyMapper;
import com.epolsoft.practice.security.CurrentUser;
import com.epolsoft.practice.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ClientController {
    @Autowired
    private ClientMapper clientMapper;

    @PostMapping("/client")
    public void add(@RequestBody Client client){
        clientMapper.insert(client);
    }

//    @GetMapping("/clients/by-company/{id}")
//    public List<Client> getAllWithCompanyId(@PathVariable Long id){
//        return clientMapper.findAllWithCompanyId(id);
//    }

    @GetMapping("/clients")
    public List<Client> getAll(@CurrentUser UserPrincipal currentUser){
        return clientMapper.findAllWithCompanyId(currentUser.getAccount().getEmployee().getId());
    }
}
