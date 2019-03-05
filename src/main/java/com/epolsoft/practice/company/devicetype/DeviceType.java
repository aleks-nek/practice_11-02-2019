package com.epolsoft.practice.company.devicetype;

import lombok.Data;

import javax.validation.constraints.Size;

@Data
public class DeviceType {
    private Long id;

    @Size(max = 50)
    private String name;
}
