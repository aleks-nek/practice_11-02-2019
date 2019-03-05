package com.epolsoft.practice.company.ordertype;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class OrderType {
    private Long id;

    @NotBlank
    @Size(max = 50)
    private String name;
}
