package com.sentiment.dashboard.dto;

import lombok.Data;

@Data
public class SentimentResponse
{
    private String text;
    private String sentiment;
    private Double score;
    private String message;

    public SentimentResponse() {}
        public SentimentResponse(String text,
                                 String sentiment,
                                 Double score,
                                 String message)
        {
            this.text = text;
            this.sentiment = sentiment;
            this.score = score;
            this.message = message;
        }


    }
