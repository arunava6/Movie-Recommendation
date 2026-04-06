package com.example.movieRecommendation.Repository;

import com.example.movieRecommendation.Entity.Movies;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MovieRepo extends JpaRepository<Movies,Long> {
    Optional<Movies> findById(Long id);
    Page<Movies> findByTitleContainingIgnoreCase(String title, Pageable pageable);
}
