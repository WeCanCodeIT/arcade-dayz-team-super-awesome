package com.login.model;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.List;

@Entity
public class AlienGame {

    @Id
    private String username;

    @ElementCollection
    private List<Double> times;

    public AlienGame() {
    }

    public AlienGame(String username, List<Double> times) {
        this.username = username;
        this.times = times;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<Double> getTimes() {
        return times;
    }

    public void setTimes(List<Double> times) {
        this.times = times;
    }

    public double getFastestTime() {
        return times.stream().min(Double::compare).orElse(0.0);
    }

    public void addTime(double time) {
        times.add(time);
    }
}
