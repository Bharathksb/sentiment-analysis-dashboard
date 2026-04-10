package com.sentiment.dashboard.service;

import com.sentiment.dashboard.dto.SentimentResponse;
import com.sentiment.dashboard.model.SentimentResult;
import com.sentiment.dashboard.model.User;
import com.sentiment.dashboard.repository.SentimentResultRepository;
import com.sentiment.dashboard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SentimentService {

    @Autowired
    private SentimentResultRepository sentimentRepository;

    @Autowired
    private UserRepository userRepository;

    public SentimentResponse analyzeSentiment(String text, String username) {
        String lowerText = text.toLowerCase();
        List<String> positiveWords = Arrays.asList("good", "great", "excellent",
                "amazing", "wonderful", "fantastic", "happy", "love", "best",
                "awesome", "brilliant", "superb", "outstanding", "perfect", "beautiful");
        List<String> negativeWords = Arrays.asList("bad", "terrible", "awful",
                "horrible", "worst", "hate", "disgusting", "poor", "disappointing",
                "dreadful", "pathetic", "useless", "failure", "ugly", "boring");
        int positiveCount = 0;
        int negativeCount = 0;
        for (String word : positiveWords) {
            if (lowerText.contains(word)) positiveCount++;
        }
        for (String word : negativeWords) {
            if (lowerText.contains(word)) negativeCount++;
        }
        String sentiment;
        Double score;
        if (positiveCount > negativeCount) {
            sentiment = "POSITIVE";
            score = (double) positiveCount / (positiveCount + negativeCount);
        } else if (negativeCount > positiveCount) {
            sentiment = "NEGATIVE";
            score = (double) negativeCount / (positiveCount + negativeCount);
        } else {
            sentiment = "NEUTRAL";
            score = 0.5;
        }
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        SentimentResult result = new SentimentResult();
        result.setUser(user);
        result.setInputText(text);
        result.setSentiment(sentiment);
        result.setScore(score);
        sentimentRepository.save(result);
        String msg = "Analysis completed successfully!";
        return new SentimentResponse(text, sentiment, score, msg);
    }

    public List<SentimentResult> getHistory(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return sentimentRepository.findByUserId(user.getId());
    }

    public Map<String, Long> getStats(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Long userId = user.getId();
        Map<String, Long> stats = new HashMap<>();
        stats.put("POSITIVE", sentimentRepository.countByUserIdAndSentiment(userId, "POSITIVE"));
        stats.put("NEGATIVE", sentimentRepository.countByUserIdAndSentiment(userId, "NEGATIVE"));
        stats.put("NEUTRAL", sentimentRepository.countByUserIdAndSentiment(userId, "NEUTRAL"));
        return stats;
    }

    public void deleteHistory(Long id, String username) {
        sentimentRepository.deleteById(id);
    }
}