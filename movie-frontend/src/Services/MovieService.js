import axios from "axios";

const BASE_URL="http://localhost:8080/movie"

export const getAllMovies=async()=>{
    return await axios.get(`${BASE_URL}/all`)
}

export const getMoviesById=async(id)=>{
    return await axios.get(`${BASE_URL}/${id}`)
}
