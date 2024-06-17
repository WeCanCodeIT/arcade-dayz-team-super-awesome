package com.login.service;

import com.login.model.RockPaperScissors;
import com.login.repository.RockPaperScissorsRepository;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RockPaperScissorsImpl implements RockPaperScissorsService {

  @Autowired
  private RockPaperScissorsRepository rockPaperScissorsRepository;

  @Override
  public RockPaperScissors findByUsername(String username) {
    return rockPaperScissorsRepository.findByUsername(username);
  }
  
  @Override
    public RockPaperScissors save(RockPaperScissors rockPaperScissors) {
        return rockPaperScissorsRepository.save(rockPaperScissors);
    }

    @Override
    public int findScore(String username) {
       return rockPaperScissorsRepository.findByUsername(username).getWins();
    }

    @Override
    public List<RockPaperScissors> findTopThree() {
        List<RockPaperScissors> rockPaperScissorsList = rockPaperScissorsRepository.findAll();
    
        if (rockPaperScissorsList == null || rockPaperScissorsList.isEmpty()) {
            return Collections.emptyList();
        }
    

    
        List<RockPaperScissors> sortedList = rockPaperScissorsList.stream()
                .sorted(Comparator.comparingInt(RockPaperScissors::getWins).reversed())
                .limit(3)
                .collect(Collectors.toList());
        return sortedList;
    }
}
