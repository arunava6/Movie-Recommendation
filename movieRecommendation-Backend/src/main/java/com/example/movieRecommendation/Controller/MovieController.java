package com.example.movieRecommendation.Controller;

import com.example.movieRecommendation.Service.MovieService;
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

    @GetMapping("/all")
    public ResponseEntity<?> getAllMovies(){
        return ResponseEntity.status(HttpStatus.OK).body(movieService.getAllMovies());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getByMovieId(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(movieService.getByMovieId(id));
    }
}
