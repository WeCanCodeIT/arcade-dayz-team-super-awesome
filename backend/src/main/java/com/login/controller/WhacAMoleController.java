package com.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.login.model.WhacAMole;
import com.login.model.User;
import com.login.service.WhacAMoleImpl;
import com.login.service.UserServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/molesmash")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class WhacAMoleController {

    @Autowired
    private WhacAMoleImpl whacAMoleServiceImpl;

    @Autowired
    private UserServiceImpl userServiceImpl;

    @PostMapping("/winner")
    public ResponseEntity<String> winner(@RequestBody User user) {
        if (userServiceImpl.findByUsername(user.getUsername()) != null) {
            WhacAMole whacAMoleRecord = whacAMoleServiceImpl.findByUsername(user.getUsername());

            if (whacAMoleRecord == null) {
                WhacAMole newWinner = new WhacAMole(user.getUsername(), 1);
                whacAMoleServiceImpl.save(newWinner);
            } else {
                whacAMoleRecord.setWins(whacAMoleRecord.getWins() + 1);
                whacAMoleServiceImpl.save(whacAMoleRecord);
            }
        }

        return ResponseEntity.ok("Winner!");
    }

    @GetMapping("/player")
    public ResponseEntity<?> playerInfo(@RequestParam(required = false) String username) {
        if (username == null || username.isEmpty()) {
            return ResponseEntity.badRequest().body("Username parameter is missing");
        }
        User user = userServiceImpl.findByUsername(username);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    @GetMapping("/records")
    public ResponseEntity<?> topScores() {
        List<WhacAMole> topThreeScores = whacAMoleServiceImpl.findTopThree();

        if (topThreeScores != null && !topThreeScores.isEmpty()) {
            return ResponseEntity.ok(topThreeScores);
        }
        return ResponseEntity.ok("List is empty");
    }
}

