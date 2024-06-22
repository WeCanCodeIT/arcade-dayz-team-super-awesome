package com.login.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.login.model.RockPaperScissors;

public interface RockPaperScissorsRepository extends JpaRepository<RockPaperScissors, Long> {
  RockPaperScissors findByUsername(String username);
}
