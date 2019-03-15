package com.epolsoft.practice.company.order;

import com.epolsoft.practice.security.CurrentUser;
import com.epolsoft.practice.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {
    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private OrderService orderService;

    @PostMapping("/order")
    public void add(@RequestBody Order order, @CurrentUser UserPrincipal currentUser){
        orderService.insert(order, currentUser);
    }

    @GetMapping("/orders")
    public List<Order> getAll(@CurrentUser UserPrincipal currentUser){
        Long companyId = currentUser.getAccount().getEmployee().getCompany().getId();
        return orderMapper.selectByCompanyId(companyId);
    }
}
