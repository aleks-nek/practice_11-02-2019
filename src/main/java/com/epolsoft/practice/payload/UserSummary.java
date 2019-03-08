package com.epolsoft.practice.payload;

import com.epolsoft.practice.account.Account;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserSummary {
    private Account account;
}
