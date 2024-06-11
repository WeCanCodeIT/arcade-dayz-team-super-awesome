package com.login.service;

import com.login.model.TicTacToe;
import com.login.model.User;
import com.login.repository.TicTacToeRepository;
import com.login.repository.UserRepository;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

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

    @Override
    public List<TicTacToe> findTopThree() {
        List<TicTacToe> ticTacToe = ticTacToeRepository.findAll();
        return ticTacToe.stream().sorted(Comparator.comparingInt(TicTacToe::getWins).reversed()).limit(5).collect(Collectors.toList());
        
    }
}
