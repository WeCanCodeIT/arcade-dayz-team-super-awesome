package com.login.model;

import javax.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

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
        return times.isEmpty() ? 0 : Collections.min(this.times);
    }
}
