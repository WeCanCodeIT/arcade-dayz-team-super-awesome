package com.login.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.login.model.AlienGame;
import com.login.repository.AlienGameRepository;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AlienGameImpl {

    @Autowired
    private AlienGameRepository alienGameRepository;

    public AlienGame findByUsername(String username) {
        return alienGameRepository.findByUsername(username);
    }

    public void save(AlienGame alienGame) {
        alienGameRepository.save(alienGame);
    }

    public List<AlienGame> findAllTimes() {
        return alienGameRepository.findAll();
    }

    public List<AlienGame> findTopThreeTimes() {
        return alienGameRepository.findAll().stream()
                .sorted((a, b) -> Double.compare(a.getFastestTime(), b.getFastestTime()))
                .limit(3)
                .collect(Collectors.toList());
    }
}
