package com.epolsoft.practice.company.ordertype;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface OrderTypeMapper {
    @Select("select * from order_type")
    List<OrderType> selectAll();

    @Select("select * from order_type where id=#{id}")
    OrderType findById(Long id);

    @Select("select * from order_type where name=#{name}")
    OrderType findByName(String name);
}
