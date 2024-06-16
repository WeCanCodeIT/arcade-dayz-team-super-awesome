package com.login.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.login.model.DiceGame;

public interface DiceGameRepository extends JpaRepository<DiceGame, Long> {
    DiceGame findByUsername(String username);

}