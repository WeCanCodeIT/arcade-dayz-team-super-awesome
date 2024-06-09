package com.login.service;

import com.login.model.TicTacToe;

public interface TicTacToeService {
    TicTacToe findByUsername(String username);
    int findScore(String username);
    TicTacToe save(TicTacToe ticTacToe);
}