package com.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.login.model.TicTacToe;
import com.login.model.User;
import com.login.service.TicTacToeImpl;
import com.login.service.UserServiceImpl;

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
        int winner = 1;

        if (userServiceImpl.findByUsername(user.getUsername()) != null) {
         if (ticTacToeServiceImpl.findScore(user.getUsername()) < 1){
          ticTacToeServiceImpl.save(new TicTacToe(user.getId(), user.getUsername(), winner));
         } else {
          ticTacToeServiceImpl.save(new TicTacToe(user.getId(), user.getUsername(), winner ++));
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
    public ResponseEntity<?> userInfo() {
        if (!ticTacToeServiceImpl.findTopThree().isEmpty()){
            return ResponseEntity.ok(ticTacToeServiceImpl.findTopThree());
        }
        return ResponseEntity.ok("list is empty");
    }
}
