package com.login.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.login.model.WhacAMole;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public interface WhacAMoleRepository extends JpaRepository<WhacAMole, Long> {

    WhacAMole findByUsername(String username);

    List<WhacAMole> findAll();

    default List<WhacAMole> findTopThree() {
        return findAll().stream()
                .sorted((a, b) -> Integer.compare(b.getScore(), a.getScore()))
                .limit(3)
                .collect(Collectors.toList());
    }
}
