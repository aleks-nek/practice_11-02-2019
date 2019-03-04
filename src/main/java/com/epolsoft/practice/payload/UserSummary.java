package com.epolsoft.practice.payload;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserSummary {
    private Long id;
    private String login;
    private String firstName;
    private String lastName;
    private String email;
}
