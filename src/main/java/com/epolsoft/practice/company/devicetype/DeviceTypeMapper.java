package com.epolsoft.practice.company.devicetype;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface DeviceTypeMapper {
    @Select("select * from device_type")
    List<DeviceType> selectAll();

    @Select("select * from device_type where id=#{id}")
    DeviceType findById(Long id);

    @Select("select * from device_type where name=#{name}")
    DeviceType findByName(String name);
}
