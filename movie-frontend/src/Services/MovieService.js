import axios from "axios";

const BASE_URL="http://localhost:8080/movie"

export const getAllMovies=async(page=0,size=40)=>{
    return await axios.get(`${BASE_URL}/all?page=${page}&size=${size}`)
}

export const getMoviesById=async(id)=>{
    return await axios.get(`${BASE_URL}/${id}`)
}

export const getRecommendedMovie=async(title)=>{
    return await axios.get(`${BASE_URL}/recommend?title=${title}`)
}

export const searchMovieByTitle=async(title,page=0,size=40)=>{
    return await axios.get(`${BASE_URL}/search?title=${title}&page=${page}&size=${size}`)
}
