package com.epolsoft.practice.company.ordertype;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderTypeController {
    @Autowired
    private OrderTypeMapper orderTypeMapper;

    @GetMapping("/order_type")
    public List<OrderType> get(){
        return orderTypeMapper.selectAll();
    }
}
