package com.epolsoft.practice.company.client;

import com.epolsoft.practice.company.Company;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class Client {
    private Long id;

    @NotBlank
    @Size(min = 2, max = 50)
    private String name;

    @NotBlank
    @Size(min = 2, max = 30)
    private String phone;

    @NotNull
    private Company company;

    @Email
    private String email;

    @Size(max = 255)
    private String address;

    @Size(max = 255)
    private String comment;

    private Boolean isConflicted;
}
