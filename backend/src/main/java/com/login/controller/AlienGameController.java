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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

        System.out.println("Received winner request for user: " + username + " with time: " + newTime);

        User user = userServiceImpl.findByUsername(username);
        if (user != null) {
            AlienGame alienGameRecord = alienGameServiceImpl.findByUsername(username);

            if (alienGameRecord == null) {
                List<Double> times = new ArrayList<>();
                times.add(newTime);
                AlienGame newWinner = new AlienGame(username, times);
                alienGameServiceImpl.save(newWinner);
                System.out.println("New record created for user: " + username + " with time: " + newTime);
            } else {
                double fastestTime = alienGameRecord.getFastestTime();
                if (newTime < fastestTime || fastestTime == 0) {
                    alienGameRecord.addTime(newTime);
                    alienGameServiceImpl.save(alienGameRecord);
                    System.out.println("Updated record for user: " + username + " with new time: " + newTime);
                } else {
                    System.out.println("New time is not faster than the existing fastest time for user: " + username);
                }
            }
        } else {
            System.out.println("User not found: " + username);
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
        List<AlienGame> allTimes = alienGameServiceImpl.findAll();
        
        if (allTimes != null && !allTimes.isEmpty()) {
            List<Map<String, Object>> topThreeTimes = allTimes.stream()
                    .sorted((a, b) -> Double.compare(a.getFastestTime(), b.getFastestTime()))
                    .limit(3)
                    .map(game -> {
                        Map<String, Object> map = new HashMap<>();
                        map.put("username", game.getUsername());
                        map.put("fastestTime", game.getFastestTime());
                        return map;
                    })
                    .collect(Collectors.toList());
            return ResponseEntity.ok(topThreeTimes);
        }

        return ResponseEntity.ok(new ArrayList<>());
    }
}
