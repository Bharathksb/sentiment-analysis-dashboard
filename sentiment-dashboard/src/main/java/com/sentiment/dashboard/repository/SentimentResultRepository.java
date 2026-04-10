package com.sentiment.dashboard.repository;

import com.sentiment.dashboard.model.SentimentResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SentimentResultRepository
        extends JpaRepository<SentimentResult, Long> {
    List<SentimentResult> findByUserId(Long userId);
    Long countByUserIdAndSentiment(
            Long userId, String sentiment);
}