package com.login.service;

import java.util.List;

import com.login.model.RockPaperScissors;


public interface RockPaperScissorsService {
  RockPaperScissors findByUsername(String username);
  int findScore(String username);
  RockPaperScissors save (RockPaperScissors rockPaperScissors);
  List<RockPaperScissors> findTopThree();
  
}
