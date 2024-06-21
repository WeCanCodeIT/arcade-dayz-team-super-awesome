package com.login.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "alien_game")
public class AlienGame {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;

    @ElementCollection
    private List<Double> times = new ArrayList<>();

    public AlienGame(String username, List<Double> times) {
        this.username = username;
        this.times = times;
    }

    public void addTime(double time) {
        this.times.add(time);
    }

    public double getFastestTime() {
        return Collections.min(this.times);
    }
}

