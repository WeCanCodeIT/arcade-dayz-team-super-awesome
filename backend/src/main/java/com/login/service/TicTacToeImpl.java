package com.login.service;

import com.login.model.TicTacToe;
import com.login.repository.TicTacToeRepository;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
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
        List<TicTacToe> ticTacToeList = ticTacToeRepository.findAll();
    
        if (ticTacToeList == null || ticTacToeList.isEmpty()) {
            return Collections.emptyList();
        }
    

    
        List<TicTacToe> sortedList = ticTacToeList.stream()
                .sorted(Comparator.comparingInt(TicTacToe::getWins).reversed())
                .limit(3)
                .collect(Collectors.toList());
        System.out.println("dsigjfdghdfgihd" + sortedList);
        return sortedList;
    }
}
