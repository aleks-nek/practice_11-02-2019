package com.epolsoft.practice.role;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class Role {
    private Long id;

    @NotBlank
    private String name;
}
