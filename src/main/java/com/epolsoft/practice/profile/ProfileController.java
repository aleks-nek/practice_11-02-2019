package com.epolsoft.practice.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class ProfileController {
    @Autowired
    ProfileMapper profileMapper;

    @PostMapping("/profile")
    public void addProfile(@RequestBody Profile profile){
        profileMapper.insert(profile);
        System.out.println("");
    }

    @GetMapping("/profile/{id}")
    public Profile getProfile(@PathVariable("id") Long id){
        return profileMapper.findById(id);
    }
}
