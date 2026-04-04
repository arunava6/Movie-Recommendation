package com.example.movieRecommendation.Entity;

import com.opencsv.bean.CsvBindByName;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "movies")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Movies {

    @Id
    @Column(name = "movie_id")
    @CsvBindByName(column = "movie_id")
    private Long movieId;

    @Column(name = "adult")
    @CsvBindByName(column = "adult")
    private String adult;

    @Column(name = "backdrop_path")
    @CsvBindByName(column = "backdrop_path")
    private String backdropPath;

    @Column(name = "genres", columnDefinition = "TEXT")
    @CsvBindByName(column = "genres")
    private String genres;

    @Column(name = "original_language")
    @CsvBindByName(column = "original_language")
    private String originalLanguage;

    @Column(name = "original_title")
    @CsvBindByName(column = "original_title")
    private String originalTitle;

    @Column(name = "overview", columnDefinition = "TEXT")
    @CsvBindByName(column = "overview")
    private String overview;

    @Column(name = "popularity")
    @CsvBindByName(column = "popularity")
    private String popularity;

    @Column(name = "poster_path")
    @CsvBindByName(column = "poster_path")
    private String posterPath;

    @Column(name = "release_date")
    @CsvBindByName(column = "release_date")
    private String releaseDate;

    @Column(name = "title")
    @CsvBindByName(column = "title")
    private String title;

    @Column(name = "vote_average")
    @CsvBindByName(column = "vote_average")
    private String voteAverage;

    @Column(name = "keywords", columnDefinition = "TEXT")
    @CsvBindByName(column = "keywords")
    private String keywords;

    @Column(name = "updated_cast")
    @CsvBindByName(column = "updated_cast")
    private String updatedCast;

    @Column(name = "updated_crew")
    @CsvBindByName(column = "updated_crew")
    private String updatedCrew;

}