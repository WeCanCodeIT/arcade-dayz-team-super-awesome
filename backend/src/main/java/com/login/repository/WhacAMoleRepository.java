package com.login.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.login.model.WhacAMole;


public interface WhacAMoleRepository extends JpaRepository<WhacAMole, Long> {
    WhacAMole findByUsername(String username);

}