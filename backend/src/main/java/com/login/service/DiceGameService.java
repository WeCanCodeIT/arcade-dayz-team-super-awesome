package com.login.service;

import java.util.List;

import com.login.model.DiceGame;

public interface DiceGameService {
    DiceGame findByUsername(String username);
    int findScore(String username);
    DiceGame save(DiceGame diceGame);
    List<DiceGame> findTopThree();
}