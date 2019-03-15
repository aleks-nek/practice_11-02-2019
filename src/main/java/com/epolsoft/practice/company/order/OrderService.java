package com.epolsoft.practice.company.order;

import com.epolsoft.practice.company.Company;
import com.epolsoft.practice.company.client.ClientMapper;
import com.epolsoft.practice.company.devicetype.DeviceType;
import com.epolsoft.practice.company.devicetype.DeviceTypeMapper;
import com.epolsoft.practice.company.ordertype.OrderType;
import com.epolsoft.practice.company.ordertype.OrderTypeMapper;
import com.epolsoft.practice.security.CurrentUser;
import com.epolsoft.practice.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = Exception.class)
public class OrderService {
    @Autowired
    private OrderTypeMapper orderTypeMapper;

    @Autowired
    private DeviceTypeMapper deviceTypeMapper;

    @Autowired
    private OrderMapper orderMapper;

    public void insert(Order order, UserPrincipal userPrincipal){
        //OrderType orderType = orderTypeMapper.findByName(order.getOrderType().getName());
        //DeviceType deviceType = deviceTypeMapper.findByName(order.getDeviceType().getName());

        //order.setOrderType(orderType);
        //order.setDeviceType(deviceType);

        Company company = userPrincipal.getAccount().getEmployee().getCompany();
        order.setCompany(company);

        orderMapper.insert(order);
    }
}
