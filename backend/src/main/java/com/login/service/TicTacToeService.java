package com.login.service;

import java.util.List;

import com.login.model.TicTacToe;

public interface TicTacToeService {
    TicTacToe findByUsername(String username);
    void save(TicTacToe ticTacToe);
    List<TicTacToe> findTopWinsByUsername(String username);
}
