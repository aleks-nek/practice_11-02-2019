package com.epolsoft.practice.company.order;

import com.epolsoft.practice.company.client.Client;
import com.epolsoft.practice.company.devicetype.DeviceType;
import com.epolsoft.practice.company.employee.Employee;
import com.epolsoft.practice.company.ordertype.OrderType;
import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class Order {
    private Long id;

    @Size(max=50)
    private String imei;

    @Size(max=50)
    private String brand;

    @Size(max=50)
    private String model;

    @Size(max=255)
    private String equipment; // Комплектация

    @Size(max=255)
    private String appearance; // Внешний вид

    @Size(max=255)
    private String password;

    @Size(max = 255)
    private String defect;

    @Size(max = 255)
    private String receiverNotes;

    private Integer estimatedPrice; // Возможная цена

    private Boolean quickly; // Срочный заказ

    @NotNull
    private OrderType orderType;

    @NotNull
    private Client client;

    @NotNull
    private DeviceType deviceType;

    private Employee manager;

    private Employee executor;

}
