package com.login.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.login.model.AlienGame;
import java.util.List;

@Repository
public interface AlienGameRepository extends JpaRepository<AlienGame, Long> {

    AlienGame findByUsername(String username);

    List<AlienGame> findAll();
}
