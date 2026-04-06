package com.example.movieRecommendation.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RecommendationResponse {
    private String movie_id;
    private String title;
    private String poster_path;
    private String release_date;
}
