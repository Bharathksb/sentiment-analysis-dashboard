package com.sentiment.dashboard.controller;

import com.sentiment.dashboard.dto.SentimentRequest;
import com.sentiment.dashboard.dto.SentimentResponse;
import com.sentiment.dashboard.model.SentimentResult;
import com.sentiment.dashboard.service.SentimentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sentiment")
@CrossOrigin(origins = "*")
public class SentimentController {

    @Autowired
    private SentimentService sentimentService;

    @PostMapping("/analyze")
    public ResponseEntity<SentimentResponse> analyze(
            @RequestBody SentimentRequest request,
            Authentication authentication) {
        SentimentResponse response = sentimentService
                .analyzeSentiment(
                        request.getText(),
                        authentication.getName());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/history")
    public ResponseEntity<List<SentimentResult>> history(
            Authentication authentication) {
        List<SentimentResult> history = sentimentService
                .getHistory(authentication.getName());
        return ResponseEntity.ok(history);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> stats(
            Authentication authentication) {
        Map<String, Long> stats = sentimentService
                .getStats(authentication.getName());
        return ResponseEntity.ok(stats);


    }
    @DeleteMapping("/history/{id}")
    public ResponseEntity<String> deleteHistory(
            @PathVariable Long id,
            Authentication authentication) {
        sentimentService.deleteHistory(id, authentication.getName());
        return ResponseEntity.ok("Deleted successfully!");
    }
}