package com.login.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter 
@Setter
@AllArgsConstructor
@Table(name = "tic_tac_toe")
public class TicTacToe {
    @Id
    private Long id;
    private String username;
    private int wins;
}