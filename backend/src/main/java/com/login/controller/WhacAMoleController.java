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
    public ResponseEntity<String> winner(@RequestBody WhacAMole whacAMoleRequest) {
        String username = whacAMoleRequest.getUsername();
        int newScore = whacAMoleRequest.getScore();

        if (userServiceImpl.findByUsername(username) != null) {
            WhacAMole whacAMoleRecord = whacAMoleServiceImpl.findByUsername(username);

            if (whacAMoleRecord == null) {
                WhacAMole newWinner = new WhacAMole(username, newScore);
                whacAMoleServiceImpl.save(newWinner);
            } else {
                whacAMoleRecord.setScore(Math.max(whacAMoleRecord.getScore(), newScore));
                whacAMoleServiceImpl.save(whacAMoleRecord);
            }
        }

        return ResponseEntity.ok("High score!");
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
