package com.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.login.model.TicTacToe;
import com.login.model.User;
import com.login.service.TicTacToeImpl;
import com.login.service.UserServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/tictactoe")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class TicTacToeController {

    @Autowired
    private TicTacToeImpl ticTacToeServiceImpl;

    @Autowired
    private UserServiceImpl userServiceImpl;

    @PostMapping("/winner")
    public ResponseEntity<String> winner(@RequestBody User user) {
        if (userServiceImpl.findByUsername(user.getUsername()) != null) {
            TicTacToe ticTacToeRecord = ticTacToeServiceImpl.findByUsername(user.getUsername());
            
            if (ticTacToeRecord == null) {
                System.out.println("DFSFSGSDG" + user.getUsername());
                TicTacToe newWinner = new TicTacToe(user.getUsername(), 1);
                ticTacToeServiceImpl.save(newWinner);
                System.out.println("EFBHGE" + ticTacToeServiceImpl.findByUsername(user.getUsername()));
            } else {
                ticTacToeRecord.setWins(ticTacToeRecord.getWins() + 1);
                ticTacToeServiceImpl.save(ticTacToeRecord);
                System.out.println("tiktaktoename " + ticTacToeRecord.getUsername());
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
        List<TicTacToe> topThreeScores = ticTacToeServiceImpl.findTopThree();

        if (topThreeScores != null && !topThreeScores.isEmpty()) {
            System.out.println("Top three scores found: " + topThreeScores);
            return ResponseEntity.ok(topThreeScores);
        }

        System.out.println("Top three scores list is empty");
        return ResponseEntity.ok("List is empty");
    }
}
