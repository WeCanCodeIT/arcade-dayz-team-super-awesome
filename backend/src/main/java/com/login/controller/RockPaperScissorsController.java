package com.login.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.login.model.User;

import com.login.model.RockPaperScissors;
import com.login.service.RockPaperScissorsImpl;
import com.login.service.UserServiceImpl;


@RestController
@RequestMapping("/RPS")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RockPaperScissorsController {

  @Autowired
  private RockPaperScissorsImpl rockPaperScissorsServiceImpl;

  @Autowired
  private UserServiceImpl userServiceImpl;

  @PostMapping("/winner")
  public ResponseEntity<String> winner(@RequestBody User user) {
    if (userServiceImpl.findByUsername(user.getUsername()) != null) {
      RockPaperScissors rockPaperScissorsRecord = rockPaperScissorsServiceImpl.findByUsername(user.getUsername());

      if (rockPaperScissorsRecord == null) {
        RockPaperScissors newWinner = new RockPaperScissors(user.getUsername(), 1);

        rockPaperScissorsServiceImpl.save(newWinner);
      } else {
        rockPaperScissorsRecord.setWins(rockPaperScissorsRecord.getWins() + 1);
        rockPaperScissorsServiceImpl.save(rockPaperScissorsRecord);
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
    List<RockPaperScissors> topThreeScores = rockPaperScissorsServiceImpl.findTopThree();

    if (topThreeScores != null && !topThreeScores.isEmpty()) {
      return ResponseEntity.ok(topThreeScores);
    }
    return ResponseEntity.ok("List is empty");
  }

}
