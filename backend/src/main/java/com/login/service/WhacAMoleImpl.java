package com.login.service;
import com.login.model.WhacAMole;
import com.login.repository.WhacAMoleRepository;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WhacAMoleImpl implements WhacAMoleService {

    @Autowired
    private WhacAMoleRepository whacAMoleRepository;

    @Override
    public WhacAMole findByUsername(String username) {
        return whacAMoleRepository.findByUsername(username);
    }

    @Override
    public WhacAMole save(WhacAMole whacAMole) {
        return whacAMoleRepository.save(whacAMole);
    }

    @Override
    public int findScore(String username) {
       return whacAMoleRepository.findByUsername(username).getWins();
    }

    @Override
    public List<WhacAMole> findTopThree() {
        List<WhacAMole> whacAMoleList = whacAMoleRepository.findAll();
    
        if (whacAMoleList == null || whacAMoleList.isEmpty()) {
            return Collections.emptyList();
        }
    

    
        List<WhacAMole> sortedList = whacAMoleList.stream()
                .sorted(Comparator.comparingInt(WhacAMole::getWins).reversed())
                .limit(3)
                .collect(Collectors.toList());
        return sortedList;
    }
}

