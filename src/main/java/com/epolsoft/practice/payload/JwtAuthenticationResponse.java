package com.epolsoft.practice.payload;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class JwtAuthenticationResponse {
    private String token;
    private String tokenType = "Bearer";

    public JwtAuthenticationResponse(String jwt) {
        this.token = jwt;
    }
}
