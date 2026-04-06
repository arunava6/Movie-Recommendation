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
    public ResponseEntity<?> getAllMovies(){
        return ResponseEntity.status(HttpStatus.OK).body(movieService.getAllMovies());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getByMovieId(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(movieService.getByMovieId(id));
    }

    @GetMapping("/recommend")
    public ResponseEntity<?> recommendation(@RequestParam String title){
        return ResponseEntity.status(HttpStatus.OK).body(recommendationService.getRecommendation(title));
    }
}
