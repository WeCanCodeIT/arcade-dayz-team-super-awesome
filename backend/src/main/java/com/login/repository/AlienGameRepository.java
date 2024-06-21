package com.login.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.login.model.AlienGame;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public interface AlienGameRepository extends JpaRepository<AlienGame, Long> {

    AlienGame findByUsername(String username);

    List<AlienGame> findAll();

    default List<AlienGame> findTopThreeTimes() {
        return findAll().stream()
                .filter(alienGame -> !alienGame.getTimes().isEmpty())
                .sorted((a, b) -> Double.compare(a.getFastestTime(), b.getFastestTime()))
                .limit(3)
                .collect(Collectors.toList());
    }
}
