package com.epolsoft.practice.company.devicetype;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class DeviceTypeController {
    @Autowired
    private DeviceTypeMapper deviceTypeMapper;

    @GetMapping("/device_type")
    public List<DeviceType> get(){
        return deviceTypeMapper.selectAll();
    }
}
