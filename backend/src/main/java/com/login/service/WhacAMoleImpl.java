package com.login.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.login.model.WhacAMole;
import com.login.repository.WhacAMoleRepository;
import java.util.List;

@Service
public class WhacAMoleImpl {

    @Autowired
    private WhacAMoleRepository whacAMoleRepository;

    public WhacAMole findByUsername(String username) {
        return whacAMoleRepository.findByUsername(username);
    }

    public void save(WhacAMole whacAMole) {
        whacAMoleRepository.save(whacAMole);
    }

    public List<WhacAMole> findTopThree() {
        return whacAMoleRepository.findTopThree();
    }
}
