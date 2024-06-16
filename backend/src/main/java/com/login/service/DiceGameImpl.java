package com.login.service;

import com.login.model.DiceGame;
import com.login.repository.DiceGameRepository;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DiceGameImpl implements DiceGameService {

    @Autowired
    private DiceGameRepository DiceGameRepository;

    @Override
    public DiceGame findByUsername(String username) {
        return DiceGameRepository.findByUsername(username);
    }

    @Override
    public DiceGame save(DiceGame diceGame) {
        return DiceGameRepository.save(diceGame);
    }

    @Override
    public int findScore(String username) {
       return DiceGameRepository.findByUsername(username).getWins();
    }

    @Override
    public List<DiceGame> findTopThree() {
        List<DiceGame> diceGameList = DiceGameRepository.findAll();
    
        if (diceGameList == null || diceGameList.isEmpty()) {
            return Collections.emptyList();
        }
    

    
        List<DiceGame> sortedList = diceGameList.stream()
                .sorted(Comparator.comparingInt(DiceGame::getWins).reversed())
                .limit(3)
                .collect(Collectors.toList());
        return sortedList;
    }
}
