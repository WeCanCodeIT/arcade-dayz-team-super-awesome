package com.login.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.login.model.TicTacToe;

import java.util.List;

public interface TicTacToeRepository extends JpaRepository<TicTacToe, Long> {
    TicTacToe findByUsername(String username);

    List<TicTacToe> findAll();
}
