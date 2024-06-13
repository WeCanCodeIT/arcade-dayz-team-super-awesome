package com.login.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.login.model.TicTacToe;
import com.login.repository.TicTacToeRepository;

import java.util.List;

@Service
public class TicTacToeImpl {

    @Autowired
    private TicTacToeRepository ticTacToeRepository;

    public TicTacToe findByUsername(String username) {
        return ticTacToeRepository.findByUsername(username);
    }

    public void save(TicTacToe ticTacToe) {
        ticTacToeRepository.save(ticTacToe);
    }

    public List<TicTacToe> findTopThree() {
        System.out.println("Fetching top three scores...");
        List<TicTacToe> topThree = ticTacToeRepository.findTop3ByOrderByWinsDesc();
        System.out.println("Top three scores: " + topThree);
        return topThree;
    }
}
