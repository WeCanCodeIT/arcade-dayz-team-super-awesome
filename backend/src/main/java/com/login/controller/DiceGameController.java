package com.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.login.model.DiceGame;
import com.login.model.User;
import com.login.service.DiceGameImpl;
import com.login.service.UserServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/dice")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class DiceGameController {

    @Autowired
    private DiceGameImpl DiceGameServiceImpl;

    @Autowired
    private UserServiceImpl userServiceImpl;

    @PostMapping("/winner")
    public ResponseEntity<String> winner(@RequestBody DiceGame winnerData) {
        User user = userServiceImpl.findByUsername(winnerData.getUsername());
        if (user != null) {
            DiceGame diceGameRecord = DiceGameServiceImpl.findByUsername(winnerData.getUsername());

            if (diceGameRecord == null) {
                DiceGame newWinner = new DiceGame(winnerData.getUsername(), winnerData.getRounds());
                DiceGameServiceImpl.save(newWinner);
            } else {
                // Update only if the new score (rounds) is better (lower)
                if (winnerData.getRounds() < diceGameRecord.getRounds()) {
                    diceGameRecord.setRounds(winnerData.getRounds());
                    DiceGameServiceImpl.save(diceGameRecord);
                }
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
        List<DiceGame> topThreeScores = DiceGameServiceImpl.findTopThree();
        if (topThreeScores != null && !topThreeScores.isEmpty()) {
            return ResponseEntity.ok(topThreeScores);
        }
        return ResponseEntity.ok("List is empty");
    }
}
