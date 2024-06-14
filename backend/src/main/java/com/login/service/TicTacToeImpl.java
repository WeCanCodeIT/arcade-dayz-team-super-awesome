package com.login.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.login.model.TicTacToe;
import com.login.repository.TicTacToeRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TicTacToeImpl implements TicTacToeService {

    @Autowired
    private TicTacToeRepository ticTacToeRepository;

    public TicTacToe findByUsername(String username) {
        return ticTacToeRepository.findByUsername(username);
    }

    public void save(TicTacToe ticTacToe) {
        ticTacToeRepository.save(ticTacToe);
    }

    public List<TicTacToe> findTopThree() {
        List<TicTacToe> allScores = ticTacToeRepository.findAll();
        return allScores.stream()
                .sorted((t1, t2) -> Integer.compare(t2.getWins(), t1.getWins()))
                .limit(3)
                .collect(Collectors.toList());
    }

    @Override
    public List<TicTacToe> findTopWinsByUsername(String username) {
        List<TicTacToe> userScores = ticTacToeRepository.findAll()
                .stream()
                .filter(score -> score.getUsername().equals(username))
                .sorted((t1, t2) -> Integer.compare(t2.getWins(), t1.getWins()))
                .limit(3)
                .collect(Collectors.toList());

        return userScores;
    }
}
