package com.example.movieRecommendation.Controller;

import com.example.movieRecommendation.Service.MovieService;
import com.example.movieRecommendation.Service.RecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
@RequestMapping("/movie")
public class MovieController {
    private final MovieService movieService;
    private final RecommendationService recommendationService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllMovies(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "40") int size
    ){
        return ResponseEntity.status(HttpStatus.OK).body(movieService.getAllMovies(page,size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getByMovieId(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(movieService.getByMovieId(id));
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchMovieByTitle(
            @RequestParam String title,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "40") int size
    ){
        return ResponseEntity.status(HttpStatus.OK).body(movieService.searchMovie(title,page,size));
    }

    @GetMapping("/recommend")
    public ResponseEntity<?> recommendation(@RequestParam String title){
        return ResponseEntity.status(HttpStatus.OK).body(recommendationService.getRecommendation(title));
    }
}
