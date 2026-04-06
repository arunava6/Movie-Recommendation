package com.example.movieRecommendation.Service;

import com.example.movieRecommendation.Entity.Movies;
import com.example.movieRecommendation.Payloads.MovieResponse;
import com.example.movieRecommendation.Repository.MovieRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepo movieRepo;

    public Page<MovieResponse> getAllMovies(int page, int size) {
        Pageable pageable=PageRequest.of(page, size);
        Page<Movies> movies = movieRepo.findAll(pageable);
        return movies.map(item->convertToMovieResponse(item));
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

    public Page<MovieResponse> searchMovie(String title, int page, int size) {
        Pageable pageable=PageRequest.of(page,size);
        Page<Movies> existingMovies=movieRepo.findByTitleContainingIgnoreCase(title,pageable);
        return existingMovies.map(item->convertToMovieResponse(item));
    }
}
