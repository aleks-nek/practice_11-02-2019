package com.epolsoft.practice.company.client;

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

    @GetMapping("/client")
    public List<Client> getById(){
        return clientMapper.selectAll();
    }
}
