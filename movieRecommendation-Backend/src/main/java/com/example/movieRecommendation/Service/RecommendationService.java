package com.example.movieRecommendation.Service;

import com.example.movieRecommendation.DTO.RecommendationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RecommendationService {
    private final WebClient webClient = WebClient.create("http://localhost:8000");

    public List<RecommendationResponse> getRecommendation(String title) {
        String encodedTitle = URLEncoder.encode(title, StandardCharsets.UTF_8);
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/recommend")
                        .queryParam("title", title)
                        .build())
                .retrieve()
                .bodyToFlux(RecommendationResponse.class)
                .collectList()
                .block();
    }
}
