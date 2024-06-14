package com.login.controller;

import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.login.model.TicTacToe;
import com.login.model.User;
import com.login.service.TicTacToeImpl;
import com.login.service.UserServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/tic-tac-toe")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class TicTacToeController {

    @Autowired
    private TicTacToeImpl ticTacToeServiceImpl;

    @Autowired
    private UserServiceImpl userServiceImpl;

    @PostMapping("/winner")
    public ResponseEntity<String> winner(@RequestBody User user) {
        try {
            System.out.println("Received request for winner with user: " + user.getUsername());
            User foundUser = userServiceImpl.findByUsername(user.getUsername());
            if (foundUser != null) {
                TicTacToe ticTacToeRecord = ticTacToeServiceImpl.findByUsername(user.getUsername());
                if (ticTacToeRecord == null) {
                    ticTacToeServiceImpl.save(new TicTacToe(user.getId(), user.getUsername(), 1));
                } else {
                    ticTacToeRecord.setWins(ticTacToeRecord.getWins() + 1);
                    ticTacToeServiceImpl.save(ticTacToeRecord);
                }
                return ResponseEntity.ok("Winner!");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
        } catch (Exception e) {
            System.out.println("Error processing winner request: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @GetMapping(value = "/player", produces = MediaType.APPLICATION_JSON_VALUE)
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

    @GetMapping(value = "/records", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> topScores() {
        List<TicTacToe> topThreeScores = ticTacToeServiceImpl.findTopThree();
        if (!topThreeScores.isEmpty()) {
            return ResponseEntity.ok(topThreeScores);
        }
        return ResponseEntity.ok("List is empty");
    }

    @GetMapping(value = "/top-wins", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUserTopWins(@RequestParam String username) {
        User user = userServiceImpl.findByUsername(username);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        List<TicTacToe> topWins = ticTacToeServiceImpl.findTopWinsByUsername(username);
        if (topWins.isEmpty()) {
            return ResponseEntity.ok("No wins found for user");
        }

        return ResponseEntity.ok(topWins);
    }
}
