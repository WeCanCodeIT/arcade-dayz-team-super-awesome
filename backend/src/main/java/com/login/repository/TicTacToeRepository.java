package com.login.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.login.model.TicTacToe;


public interface TicTacToeRepository extends JpaRepository<TicTacToe, Long> {
    TicTacToe findByUsername(String username);


    @Query("SELECT t FROM TicTacToe t ORDER BY t.wins DESC")
    List<TicTacToe> findTop3ByOrderByWinsDesc();
}