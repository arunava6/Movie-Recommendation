package com.example.movieRecommendation.Payloads;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MovieResponse {
    private Long movieId;
    private String title;
    private String overview;
    private String genres;
    private String releaseDate;
    private String adult;
    private String originalLanguage;
    private String originalTitle;
    private String voteAverage;
    private String keywords;
    private String updatedCast;
    private String updatedCrew;
    private String posterUrl;
    private String backdropUrl;
}
