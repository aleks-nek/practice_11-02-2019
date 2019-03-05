package com.epolsoft.practice.company.order;

import com.epolsoft.practice.company.client.ClientMapper;
import com.epolsoft.practice.company.devicetype.DeviceType;
import com.epolsoft.practice.company.devicetype.DeviceTypeMapper;
import com.epolsoft.practice.company.ordertype.OrderType;
import com.epolsoft.practice.company.ordertype.OrderTypeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    @Autowired
    private OrderTypeMapper orderTypeMapper;

    @Autowired
    private DeviceTypeMapper deviceTypeMapper;

    @Autowired
    private ClientMapper clientMapper;

    @Autowired
    private OrderMapper orderMapper;

    public void insert(Order order){
        OrderType orderType = orderTypeMapper.findByName(order.getOrderType().getName());
        DeviceType deviceType = deviceTypeMapper.findByName(order.getDeviceType().getName());

        order.setOrderType(orderType);
        order.setDeviceType(deviceType);

        clientMapper.insert(order.getClient());

        orderMapper.insert(order);
    }
}
