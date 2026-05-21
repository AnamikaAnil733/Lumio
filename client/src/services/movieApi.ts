import axios from "axios";


const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

export const searchMovies = async ()=>{
    const response = await API.get("/movies/search")
    return response.data
}


export default API;