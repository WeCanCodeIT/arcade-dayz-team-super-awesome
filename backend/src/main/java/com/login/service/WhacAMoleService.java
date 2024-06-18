package com.login.service;

import java.util.List;

import com.login.model.WhacAMole;

public interface WhacAMoleService {
    WhacAMole findByUsername(String username);
    int findScore(String username);
    WhacAMole save(WhacAMole whacAMole);
    List<WhacAMole> findTopThree();
}
