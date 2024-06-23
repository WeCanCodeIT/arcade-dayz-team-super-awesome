package com.login.service;

import com.login.model.AlienGame;
import com.login.repository.AlienGameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public List<AlienGame> findAll() {
        return alienGameRepository.findAll();
    }
}
