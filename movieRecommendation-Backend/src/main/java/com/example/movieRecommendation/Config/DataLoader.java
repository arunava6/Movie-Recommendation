package com.example.movieRecommendation.Config;

import com.example.movieRecommendation.Entity.Movies;
import com.example.movieRecommendation.Repository.MovieRepo;
import com.example.movieRecommendation.Service.MovieService;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataLoader implements ApplicationRunner {
    private final MovieRepo movieRepo;

    @Override
    public void run(ApplicationArguments args) throws Exception {

        if (movieRepo.count() == 0) {
            Resource resource = new ClassPathResource("movies_clean.csv");
            try (Reader reader = new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8)) {
                CsvToBean<Movies> csvToBean = new CsvToBeanBuilder<Movies>(reader)
                        .withType(Movies.class)
                        .withIgnoreLeadingWhiteSpace(true)
                        .withIgnoreEmptyLine(true)
                        .withThrowExceptions(false)
                        .build();

                List<Movies> movies = csvToBean.parse();
                csvToBean.getCapturedExceptions().forEach(e ->
                        log.warn("Skipped line: {}", e.getMessage())
                );
                // Handle empty → null
                movies.forEach(movie -> {
                    if ("".equals(movie.getBackdropPath())) movie.setBackdropPath(null);
                    if ("".equals(movie.getPosterPath())) movie.setPosterPath(null);
                });

                movieRepo.saveAll(movies);
                log.info("Movies loaded into DB: {}", movies.size());
            }
        }
    }
}


