package com.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.login.model.AlienGame;
import com.login.model.AlienGameRequest;
import com.login.model.User;
import com.login.service.AlienGameImpl;
import com.login.service.UserServiceImpl;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/alienjump")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AlienGameController {

    @Autowired
    private AlienGameImpl alienGameServiceImpl;

    @Autowired
    private UserServiceImpl userServiceImpl;

    @PostMapping("/winner")
    public ResponseEntity<String> winner(@RequestBody AlienGameRequest alienGameRequest) {
        String username = alienGameRequest.getUsername();
        double newTime = alienGameRequest.getTime();

        if (userServiceImpl.findByUsername(username) != null) {
            AlienGame alienGameRecord = alienGameServiceImpl.findByUsername(username);

            if (alienGameRecord == null) {
                List<Double> times = new ArrayList<>();
                times.add(newTime);
                AlienGame newWinner = new AlienGame(username, times);
                alienGameServiceImpl.save(newWinner);
            } else {
                alienGameRecord.addTime(newTime);
                alienGameServiceImpl.save(alienGameRecord);
            }
        }

        return ResponseEntity.ok("New record time!");
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
    public ResponseEntity<?> topTimes() {
        List<AlienGame> topThreeTimes = alienGameServiceImpl.findTopThreeTimes();

        if (topThreeTimes != null && !topThreeTimes.isEmpty()) {
            return ResponseEntity.ok(topThreeTimes);
        }
        return ResponseEntity.ok("List is empty");
    }
}
