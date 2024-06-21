package com.login.service;

import java.util.List;

import com.login.model.AlienGame;

public interface AlienGameService {
    AlienGame findByUsername(String username);
    int findTime(String username);
    AlienGame save(AlienGame alienGame);
    List<AlienGame> findTopThreeTimes();
}
