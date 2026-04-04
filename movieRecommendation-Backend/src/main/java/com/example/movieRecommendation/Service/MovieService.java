package com.example.movieRecommendation.Service;

import com.example.movieRecommendation.Entity.Movies;
import com.example.movieRecommendation.Payloads.MovieResponse;
import com.example.movieRecommendation.Repository.MovieRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepo movieRepo;

    public List<MovieResponse> getAllMovies() {
        List<Movies> movies = movieRepo.findAll();
        return movies.stream()
                .map(item -> convertToMovieResponse(item))
                .toList();
    }

    private MovieResponse convertToMovieResponse(Movies item) {
        String posterUrl = item.getPosterPath() != null
                ? "https://image.tmdb.org/t/p/w500" + item.getPosterPath()
                : null;
        String backdropUrl = item.getBackdropPath() != null
                ? "https://image.tmdb.org/t/p/w1280" + item.getBackdropPath()
                : null;

        return MovieResponse.builder()
                .movieId(item.getMovieId())
                .title(item.getTitle())
                .overview(item.getOverview())
                .genres(item.getGenres())
                .releaseDate(item.getReleaseDate())
                .adult(item.getAdult())
                .originalLanguage(item.getOriginalLanguage())
                .originalTitle(item.getOriginalTitle())
                .voteAverage(item.getVoteAverage())
                .keywords(item.getKeywords())
                .updatedCast(item.getUpdatedCast())
                .updatedCrew(item.getUpdatedCrew())
                .posterUrl(posterUrl)
                .backdropUrl(backdropUrl)
                .build();

    }

    public MovieResponse getByMovieId(Long id) {
        Movies existingMovie = movieRepo.findById(id).orElseThrow(
                () -> new IllegalArgumentException("Movie id not found")
        );
        return convertToMovieResponse(existingMovie);
    }

}
