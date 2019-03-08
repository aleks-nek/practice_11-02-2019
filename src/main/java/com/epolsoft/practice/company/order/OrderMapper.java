package com.epolsoft.practice.company.order;

import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface OrderMapper {
    class Reference {
        static final String ORDER_TYPE = "com.epolsoft.practice.company.ordertype.OrderTypeMapper.findById";
        static final String CLIENT = "com.epolsoft.practice.company.client.ClientMapper.findById";
        static final String DEVICE_TYPE = "com.epolsoft.practice.company.devicetype.DeviceTypeMapper.findById";
        static final String EMPLOYEE = "com.epolsoft.practice.company.employee.EmployeeMapper.findById";
    }

    @Select("select * from orders")
    @Results(id = "orderMapper", value = {
        @Result(property = "orderType", column = "order_type_id", one = @One(select = Reference.ORDER_TYPE)),
        @Result(property = "client", column = "client_id", one = @One(select = Reference.CLIENT)),
        @Result(property = "deviceType", column = "device_type_id", one = @One(select = Reference.DEVICE_TYPE)),
        @Result(property = "manager", column = "manager", one = @One(select = Reference.EMPLOYEE)),
        @Result(property = "executor", column = "executor", one = @One(select = Reference.EMPLOYEE)),
        @Result(property = "receiverNotes", column = "receiver_notes"),
        @Result(property = "estimatedPrice", column = "estimated_price")
    })
    List<Order> selectAll();

    @Insert("insert into orders " +
            "(imei, brand, model, equipment, appearance, password, defect, receiver_notes," +
            " estimated_price, quickly, order_type_id, client_id, device_type_id, manager_id, executor_id) " +

            "values(#{imei}, #{brand}, #{model}, #{equipment}, #{appearance}, #{password}, #{defect}, #{receiverNotes}," +
            " #{estimatedPrice}, #{quickly}, #{orderType.id}, #{client.id}, #{deviceType.id}, #{manager.id}, #{executor.id})")
    @Options(keyProperty = "id", keyColumn = "id", useGeneratedKeys = true)
    void insert(Order order);
}
