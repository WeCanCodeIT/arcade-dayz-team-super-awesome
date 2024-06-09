package com.login.service;

import com.login.model.TicTacToe;
import com.login.model.User;
import com.login.repository.TicTacToeRepository;
import com.login.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TicTacToeImpl implements TicTacToeService {

    @Autowired
    private TicTacToeRepository ticTacToeRepository;

    @Override
    public TicTacToe findByUsername(String username) {
        return ticTacToeRepository.findByUsername(username);
    }

    @Override
    public TicTacToe save(TicTacToe ticTacToe) {
        return ticTacToeRepository.save(ticTacToe);
    }

    @Override
    public int findScore(String username) {
       return ticTacToeRepository.findByUsername(username).getWins();
    }
}
